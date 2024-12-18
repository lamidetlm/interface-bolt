export const quests = [
  {
    id: 'welcome',
    title: 'Bienvenue chez Salomon',
    description: 'Familiarisez-vous avec l\'environnement du magasin',
    detailedDescription: 'Explorez le magasin et repérez les différentes zones : chaussures, vêtements, équipements. Prenez le temps de vous familiariser avec l\'agencement.',
    completionMessage: 'Parfait ! Vous connaissez maintenant les bases de la disposition du magasin.',
    prerequisites: [],
  },
  {
    id: 'product-knowledge',
    title: 'Expert Produits',
    description: 'Apprenez les caractéristiques des chaussures de trail',
    detailedDescription: 'Étudiez en détail les spécificités techniques des chaussures de trail Salomon : semelles Contagrip®, technologies Gore-Tex, systèmes de laçage Quicklace™.',
    completionMessage: 'Bravo ! Vous maîtrisez maintenant les aspects techniques de nos chaussures de trail.',
    prerequisites: ['welcome'],
  },
  {
    id: 'customer-service',
    title: 'Service Client Excellence',
    description: 'Pratiquez l\'accueil client selon les standards Salomon',
    detailedDescription: 'Apprenez à accueillir les clients avec professionnalisme, à identifier leurs besoins et à les conseiller de manière personnalisée.',
    completionMessage: 'Excellent ! Vos compétences en service client sont maintenant au niveau des standards Salomon.',
    prerequisites: ['product-knowledge'],
  },
  {
    id: 'sales-technique',
    title: 'Techniques de Vente',
    description: 'Maîtrisez l\'art de la vente consultative',
    detailedDescription: 'Développez vos compétences en vente consultative : écoute active, présentation des avantages produits, gestion des objections.',
    completionMessage: 'Félicitations ! Vous êtes maintenant un expert en vente consultative.',
    prerequisites: ['customer-service'],
  },
];