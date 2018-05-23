function connexionClient() {
    var champLogin = $('#champ-login').val();
    var champPassword = $('#champ-password').val();

    $('#message').html('Connexion en cours...');

    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'connexionClient',
            login: champLogin,
            password: champPassword
        },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        if (data != null)
            window.location = "accueilClient.html";
        else{
            $('#message').html('Identifiants non valides, veuillez réessayer ...');
        }

    });
}


function connexionEmploye() {
    var champLogin = $('#champ-login').val();
    var champPassword = $('#champ-password').val();

    $('#message').html('Connexion en cours...');

    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'connexionEmployee',
            login: champLogin,
            password: champPassword
        },
        dataType: 'json'
    }).done(function (data) {
        if (data == undefined)
            $('#message').html('Identifiants non valides, veuillez réessayer');
        else{
            window.location = "accueilEmploye.html";
        }
    });
}


function inscription() {
    var champNom = $('#champ-nom').val();
    var champPrenom = $('#champ-prenom').val();
    var champCivilite = $('#champ-civilite').val();
    var champAdresse = $('#champ-adresse').val();
    var champTel = $('#champ-tel').val();
    var champDate = $('#champ-date').val();
    var champEmail = $('#champ-email').val();
    var champPassword = $('#champ-password').val();
    var champCPassword = $('#champ-cpassword').val();
    $('#message').html('Inscription en cours...');
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'inscriptionClient',
            nom: champNom,
            prenom: champPrenom,
            civilite: champCivilite,
            adresse: champAdresse,
            tel: champTel,
            date: champDate,
            email: champEmail,
            password: champPassword,
            cpassword: champCPassword
        },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        if (data != null)
            window.location = "connexionClient.html";
        else{
            $('#message').html('Saisie non valide, veuillez réessayer ...');
        }
    });
}


function getInfosIntervention() {

    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'consulterInterventionEmploye'
        },
        dataType: 'json'
    }).done(function (data) {
        //document.getElementById("nomEmployee").innerHTML = "data.firstNameEmployee";
        $('#message').html("Bonjour " + JSON.stringify(data.employee.firstName).slice(1,JSON.stringify(data.employee.firstName).length-1) +
                              " vous avez une intervention en attente :");



        if (data.pet == undefined && data.object == undefined)
        {
            $('#interventionType').html("Incident");
        }
        else if (data.pet == undefined)
        {
            $('#interventionType').html("Delivery");
        }
        else
        {
            $('#interventionType').html("Pet");
        }

        $('#interventionClient').html(JSON.stringify(data.client.name).slice(1,JSON.stringify(data.client.name).length-1) + 
                                      " " + JSON.stringify(data.client.firstName).slice(1,JSON.stringify(data.client.firstName).length-1));

        $('#interventionDescription').html(JSON.stringify(data.description).slice(1,JSON.stringify(data.description).length-1));

        $('#interventionHorodate').html(JSON.stringify(data.creationDate).slice(1,JSON.stringify(data.creationDate).length-1));
    });
}


function deconnexionEmployee() {
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'deconnexionEmployee'
        },
        dataType: 'json'
    }).done(function (data) {
        window.location = "connexionEmploye.html";
    });
}


function consulterIntervention() {
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'consulterInterventionEmploye'
        },
        dataType: 'json'
    }).done(function (data) {

        if (data.pet == undefined && data.object == undefined)
        {
            $('#interventionType').html("Incident");
        }
        else if (data.pet == undefined)
        {
            $('#interventionType').html("Delivery");
        }
        else
        {
            $('#interventionType').html("Pet");
        }

        $('#interventionClient').html(JSON.stringify(data.client.name).slice(1,JSON.stringify(data.client.name).length-1) + 
                                      " " + JSON.stringify(data.client.firstName).slice(1,JSON.stringify(data.client.firstName).length-1));

        $('#interventionDescription').html(JSON.stringify(data.description).slice(1,JSON.stringify(data.description).length-1));

        $('#interventionHorodate').html(JSON.stringify(data.creationDate).slice(1,JSON.stringify(data.creationDate).length-1));
    });
}


function cloreIntervention(){
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'conclureInterventionEmploye',
            dateFinIntervention: dateFinInterventionChamp.value,
            heureFinIntervention: heureFinInterventionChamp.value,
            issueTerminee: issue1.checked,
            issueProbleme: issue2.checked,
            commentaireIntervention: commentaireInterventionChamp.value
        },
        dataType: 'json'
    }).done(function (data) {
        if (data.interventionTerminee == true)
            window.location = "accueilEmploye.html";
    });
}


function getNbInterventions(){
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'nombreInterventionsClient'
        },
        dataType: 'json'
    }).done(function (data) {
        $('#clientFirstName').html(data.clientFirstName);
        $('#nbInterventions').html(data.nbIntervention);
        $('#message').html('Bienvenue, ' + data.clientFirstName + ' vous avez actuellement ' + data.nbIntervention + ' interventions en cours.');
    });
}


function deconnexionClient() {
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'deconnexionClient'
        },
        dataType: 'json'
    }).done(function (data) {
        window.location = "connexionClient.html";
    });
}


function majAffichage() {
    document.getElementById('choix-livraison').style.visibility='hidden';
    document.getElementById('choix-animal').style.visibility='hidden';
    if (document.getElementById('livraison').checked){
        document.getElementById('choix-livraison').style.visibility='visible';
        document.getElementById('choix-animal').style.visibility='hidden';
    }
    else if (document.getElementById('animal').checked){
        document.getElementById('choix-livraison').style.visibility='hidden';
        document.getElementById('choix-animal').style.visibility='visible';
    }
}


function demanderIntervention(){
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'demandeInterventionClient',
            livraison: livraison.checked,
            incident: incident.checked,
            animal: animal.checked,
            objet: objetChamp.value,
            entreprise: entrepriseChamp.value,
            animalName: animalChamp.value,
            description: descriptionChamp.value
        },
        dataType: 'json'
    }).done(function (data) {
        window.location = 'accueilClient.html';
    });
}


$(document).ready(function () {
    
    var path = window.location.pathname;
    var page = path.split("/").pop();
    
    switch(page)
    {
        case 'inscription.html':
            $('#bouton-connexion-client').on('click', function () {
                window.location = 'connexionClient.html';
            });
        break;
        case 'connexionClient.html':
            $('#bouton-inscription').on('click', function () {
                window.location = 'inscription.html';
            });
        break;
        case 'accueilClient.html':
            getNbInterventions();
        break;
        case 'demandeIntervention.html':
            majAffichage();
            $('#livraison').on('click', function () {
                majAffichage();
            });
            $('#incident').on('click', function () {
                majAffichage();
            });
            $('#animal').on('click', function () {
                majAffichage();
            });
            $('#bouton-demander-Intervention').on('click', function () {
                demanderIntervention();
            });
        break;
        case 'accueilEmploye.html':
            getInfosIntervention();
        break;
        case 'resolutionIntervention.html':
            consulterIntervention();
        break;
    }
    
    $('#bouton-deconnexion-employee').on('click', function () {
        deconnexionEmployee();
    });
    
    $('#bouton-deconnexion-client').on('click', function () {
        deconnexionClient();
    });
    
    $('#bouton-inscription').on('click', function () {
        console.log('Click sur le bouton "S\'enregistrer"');
        inscription();
    });
    
    $('#bouton-connexion-client').on('click', function () {
        console.log('Click sur le bouton "Se Connecter"');
        connexionClient();
    });
    
    $('#bouton-connexion-employe').on('click', function () {
        console.log('Click sur le bouton "Se Connecter"');
        connexionEmploye();
    });
    
    $('#bouton-cloreIntervention').on('click', function () {
            cloreIntervention();
    });
    
    
});