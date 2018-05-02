/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Actions;

import fr.insalyon.dasi.proactif.entities.Client;
import fr.insalyon.dasi.proactif.services.ServicesClient;


/**
 *
 * @author cflorant, aminemboulouma
 */
public class InscriptionClientAction extends Action {
    private Client client;
    ServicesClient serviceClient;

    public InscriptionClientAction(Client client, ServicesClient serviceClient) {
        this.client = client;
        this.serviceClient = serviceClient;
    }
    
    public boolean execute(){
        if (serviceClient.createClient(this.client) != null) {
            return true;
        }else{
            return false;
        }
    }
    
}