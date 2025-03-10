Le backend et frontend ont été faits en 2 petits jours (+- 10 heures).

Pour aller vite et ne développer que la partie important, le case d'usage du paiement, je n'ai mis aucune validation de DTO, pas de validations quelconques du type -> si le user n'existe pas alors, on ne continue pas etc, je pars du principe que moi, je sais que j'envoie le bon ID. Pareil pour le choix des endpoints comme le rentals/:id/add-tenant (en DDD, j'aurais réfléchi à une meilleure solution pour ne pas mélanger le module rental avec le module tenant).

J'ai utilisé une architecture hexagonal simple pour structurer l'app.

Voici une démo simple de l'utilisation avec le frontend: https://www.veed.io/view/8e4272bb-1781-4e06-b461-7c2573b1b197?panel=share
- Ajouter un locataire dans une location
- Demander au locataire de payer son loyer
- Le paiement se voit en pending dans la table
- Le locataire se connecter et peut payer le loyer
- Le paiement change en succès grâce aux webhook
