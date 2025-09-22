import { NextResponse } from 'next/server';
import axios from 'axios';

const CONTENTSTACK_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  managementToken: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'development',
  region: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'eu'
};

async function getEntryDetails(contentTypeUid, entryUid) {
  try {
    const entryUrl = `https://eu-app.contentstack.com/v3/content_types/${contentTypeUid}/entries/${entryUid}`;
    
    
    const response = await axios.get(entryUrl, {
      headers: {
        'api_key': CONTENTSTACK_CONFIG.apiKey,
        'authorization': CONTENTSTACK_CONFIG.managementToken,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.entry;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entrée:', error.response?.data || error.message);
    throw error;
  }
}

async function publishEntry(entryUid, contentType) {
  try {
    const publishUrl = `https://eu-app.contentstack.com/v3/content_types/${contentType}/entries/${entryUid}/publish`;
    console.log(`Tentative de publication:`, {
      entryUid,
      contentType,
      environment: CONTENTSTACK_CONFIG.environment,
      apiKey: CONTENTSTACK_CONFIG.apiKey,
      managementToken: CONTENTSTACK_CONFIG.managementToken,
      url: publishUrl
    });

    const response = await axios.post(publishUrl, {
      entry: {
        environments: [CONTENTSTACK_CONFIG.environment],
        locales: ['en-us']
      }
    }, {
      headers: {
        'api_key': CONTENTSTACK_CONFIG.apiKey,
        'authorization': CONTENTSTACK_CONFIG.managementToken,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Article publié avec succès:', entryUid);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la publication:', {
      entryUid,
      contentType,
      error: error.response?.data || error.message,
      status: error.response?.status
    });
    throw error;
  }
}

export async function POST(request) {
  try {
    const webhookData = await request.json();
    console.log("hahahahahhahahah")
    console.log('Webhook reçu:', JSON.stringify(webhookData, null, 2));
    

    const event = webhookData.data.workflow.type;
    console.log('Événement détecté:', event);
    if (event && event.includes('workflow')) {
      console.log('Événement de workflow détecté');
      
      const data = webhookData.data.workflow;
      console.log('Données du webhook:', JSON.stringify(data, null, 2));
      let entryUid, contentTypeUid;

      if (data.entry) {
        entryUid = data.entry.uid;
        contentTypeUid = data.content_type?.uid;
      }
      console.log(`Entry UID: ${entryUid}, Content Type UID: ${contentTypeUid}`);

      if (!entryUid || !contentTypeUid) {
        console.log(' UID d\'entrée ou type de contenu non trouvé');
        return NextResponse.json({ 
          success: true,
          message: 'Webhook reçu mais données incomplètes'
        });
      }

      console.log(`Récupération des détails de l entrée: ${entryUid} (${contentTypeUid})`);

      try {
        const entryDetails = await getEntryDetails(contentTypeUid, entryUid);
        console.log("entry detailllls", entryDetails);
        
        console.log('Détails de l\'entrée:', {
          uid: entryDetails.uid,
          title: entryDetails.title,
          workflow: entryDetails.workflow || 'Aucun workflow',
          publish_details: entryDetails.publish_details || 'Non publié'
        });

        // const workflowStage = entryDetails.workflow?.stage;
        const stageName = data.log.name;

        console.log(`Stage actuel du workflow: "${stageName}"`);

        if (stageName && (
          stageName.toLowerCase() === 'approved' 
        )) {
          console.log(`Article approuvé, publication automatique: ${entryUid}`);
          
          try {
            await publishEntry(entryUid, contentTypeUid);
            
            return NextResponse.json({ 
              success: true,
              message: 'Article publié automatiquement',
              entryUid: entryUid,
              contentType: contentTypeUid,
              workflowStage: stageName
            });
          } catch (publishError) {
            console.error(' Échec de la publication automatique:', publishError);
            return NextResponse.json(
              { 
                error: 'Échec de la publication automatique',
                entryUid: entryUid,
                details: publishError.message 
              },
              { status: 500 }
            );
          }
        } else {
          console.log(`Stage "${stageName}" ignoré (pas Approved)`);
          return NextResponse.json({ 
            success: true,
            message: `Webhook reçu, stage actuel: "${stageName}" (pas Approved)`,
            entryUid: entryUid,
            currentStage: stageName
          });
        }

      } catch (fetchError) {
        console.error('Erreur lors de la récupération des détails de l\'entrée:', fetchError);
        return NextResponse.json(
          { 
            error: 'Impossible de récupérer les détails de l\'entrée',
            entryUid: entryUid,
            details: fetchError.message 
          },
          { status: 500 }
        );
      }
    } else {
      console.log(`Événement "${event}" ignoré (pas un workflow)`);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook reçu mais aucune action nécessaire',
      event: event
    });

  } catch (error) {
    console.error('Erreur dans le webhook:', error);
    return NextResponse.json({ 
      error: 'Erreur lors du traitement du webhook',
      details: error.message 
    }, { status: 500 });
  }
}

// Handler pour les autres méthodes HTTP (optionnel, pour débugger)
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint actif',
    timestamp: new Date().toISOString(),
    environment: CONTENTSTACK_CONFIG.environment,
    region: CONTENTSTACK_CONFIG.region,
    apiUrl: "https://eu-app.contentstack.com"
  });
}