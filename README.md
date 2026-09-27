# Portfolio de Wafa Miledi

Portfolio statique en français. Ouvrir `index.html` directement, ou lancer `python -m http.server 8000 --bind 127.0.0.1` puis visiter http://127.0.0.1:8000.

## Contenu

Le PDF `cv wafa miledi.pdf` fourni par la propriétaire est la référence : licence Management 2023–2026 et master Entrepreneuriat depuis 2026 à l’IHEC Carthage. Le master est indiqué en cours, conformément à la rubrique Formation du CV. Le téléchargement pointe directement vers ce fichier.

## Organisation

- `index.html` : contenu, navigation, coordonnées et liens.
- `style.css` : palette, typographie locale, mise en page et adaptations mobiles.
- `script.js` : menu accessible, navigation active et copie d’adresse.
- `art.js` : ancienne composition à orbites, conservée comme archive et non chargée par le portfolio.
- `art-studio.html` : ancien atelier indépendant pour explorer la composition et exporter une image ; hors de la navigation publique.
- `assets/compotech.webp` : illustration conceptuelle générée avec Higgsfield, pas une photographie du produit réel.
- `assets/fonts` et `assets/vendor` : polices et p5.js locaux. Aucun service externe requis pour afficher le site.

Le site utilise des liens e-mail et téléphone. Aucun formulaire ne prétend envoyer un message sans service d’envoi.

## Statistiques privées

L’intégration Cloudflare Web Analytics est configurée dans `analytics.js` avec
l’identifiant public du site dans `index.html`. La collecte commencera après
publication sur GitHub Pages. Vider `data-site-token` désactive la collecte.
Les statistiques se consultent depuis le compte Cloudflare de la propriétaire.
Le portfolio ne contient ni tableau de bord public ni mot de passe administrateur.

### Activation

1. Se connecter à [Cloudflare](https://dash.cloudflare.com/), puis ouvrir **Web Analytics → Add a site**.
2. Ajouter `wafamiledi.github.io` et récupérer le script proposé dans **Manage site**.
3. Copier uniquement la valeur `token` du script dans `data-site-token=""` dans `index.html`. C’est l’identifiant public de collecte, **pas une clé API ou un mot de passe**. Ne pas ajouter un second script Cloudflare.
4. Publier les fichiers `index.html` et `analytics.js` sur GitHub Pages.
5. Visiter le site en HTTPS puis consulter Web Analytics après quelques minutes.

Activer la double authentification du compte Cloudflare et réserver l’accès au
compte à la propriétaire. Aucun changement de DNS ou d’hébergement n’est nécessaire.
Pour désactiver la collecte, vider `data-site-token` puis republier.

### Fonctionnement et limites

- Cloudflare annonce une mesure sans cookies, sans stockage local et sans empreinte individuelle du navigateur. Les données de mesure sont traitées par Cloudflare.
- Aucun formulaire, compte visiteur ou fenêtre supplémentaire n’est ajouté.
- Le chargement est asynchrone et indépendant de la navigation du portfolio.
- La collecte est désactivée sur les autres domaines, en local, en HTTP et lorsque le navigateur exprime Do Not Track ou Global Privacy Control.
- Le tableau de bord fournit notamment visites, pages vues, provenance et pays approximatif ; il ne révèle pas l’identité des personnes.
- Le portfolio est une seule page : changer de section ne crée pas une nouvelle page vue. Les clics de téléchargement du CV ne sont pas mesurés par cette intégration.
- Les bloqueurs, les préférences de confidentialité et les scripts désactivés peuvent réduire les comptages. Il n’y a pas d’historique avant l’activation.

Références : [installation officielle](https://developers.cloudflare.com/web-analytics/get-started/),
[confidentialité du service](https://www.cloudflare.com/web-analytics/).
