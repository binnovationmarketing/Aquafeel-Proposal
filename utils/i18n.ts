export type Language = 'pt' | 'en' | 'es';

type TranslationStructure = typeof ptTranslations;

const ptTranslations = {
  welcome: {
    title: "Bem-vindo",
    subtitle: "Acesso exclusivo à proposta",
    restricted: "Área de Acesso Restrito",
    system: "Aquafeel Intelligence System",
    identify: "Por favor, identifique-se para descriptografar sua proposta.",
    yourName: "SEU NOME",
    spouseName: "NOME DO CÔNJUGE (OPCIONAL)",
    placeholderName: "Ex: João Silva",
    placeholderSpouse: "Ex: Maria Silva",
    accessButton: "LIBERAR ACESSO VIP",
    backButton: "Voltar",
    secure: "Protocolo de Segurança Criptografado",
    error: "Identificação necessária para prosseguir."
  },
  hero: {
    platinum: "Regalo de Navidad Exclusivo",
    welcomeHome: "A Aquafeel vai te dar",
    subtitle: "Qualifique-se para o programa de água limpa antes de 25/12 e receba um presente único:",
    systemName: "$1.000 DÓLARES DE CASHBACK.",
    cashbackTitle: "CASHBACK NATAL",
    cashbackValue: "+$1.000,00",
    warrantyTitle: "Garantia Vitalícia",
    warrantySub: "Limitada (25 anos)",
    installTitle: "Instalação",
    installSub: "Grátis ($0 Custo)",
    soapTitle: "2 Anos de Sabão",
    soapSub: "Para toda a casa",
    paymentTitle: "Primeiro Pagamento",
    paymentSub: "30 a 45 dias (2026)",
    penaltyTitle: "Sem Penalidade",
    penaltySub: "Antecipe seus pagamentos",
    analysisTitle: "Análise de Água",
    analysisSub: "1x por ano (Anual)"
  },
  info: {
    label: "Fatos Reais, Dados Públicos",
    title: "O Que Está Realmente na Sua Água?",
    subtitle: "A água municipal cumpre regulamentos básicos, mas \"legal\" não significa \"saudável\". Sua nova casa merece proteção contra os contaminantes modernos.",
    alertTitle: "Alerta Regional",
    alertBody: "Estudos recentes indicam altos níveis de PFAS (Químicos Eternos), Chumbo e Cloro nas redes de abastecimento. Estes compostos se acumulam no corpo e nos encanamentos.",
    analysisTitle: "Análise Aquafeel",
    analysisBody: "Nosso sistema de Tanque Duplo + Osmose Reversa é a única barreira física real entre sua família e estes contaminantes.",
    virus: "Elimina 99.9% de Vírus e Bactérias",
    heavyMetals: "Remove Metais Pesados (Chumbo, Mercúrio)",
    chlorine: "Neutraliza Cloro e Cloraminas"
  },
  malefices: {
    title: "Top 10 Malefícios da Água Contaminada",
    subtitle: "O que você não vê está destruindo seu patrimônio e a saúde de quem você ama.",
    home: {
      title: "Para a Saúde do Lar",
      m1: "Corrosão das Tubulações: Metais pesados e cloro destroem o cobre e PVC por dentro.",
      m2: "Morte de Eletrodomésticos: Calcário e minerais reduzem a vida de máquinas e aquecedores em 50%.",
      m3: "Manchas Irreversíveis: Depósitos minerais que destroem o brilho de vidros, mármores e metais."
    },
    adults: {
      title: "Para os Adultos",
      m1: "Danos à Pele e Cabelo: O cloro remove a oleosidade natural, causando envelhecimento precoce.",
      m2: "Desreguladores Endócrinos: PFAS e químicos afetam o equilíbrio hormonal e metabolismo.",
      m3: "Acúmulo de Metais: Chumbo e mercúrio se acumulam no organismo ao longo de décadas."
    },
    children: {
      title: "Para as Crianças",
      m1: "Riscos no Desenvolvimento: O chumbo na água é ligado a atrasos cognitivos e de crescimento.",
      m2: "Imunidade Fragilizada: Exposição constante a bactérias e vírus que sobrevivem ao tratamento comum.",
      m3: "Problemas Respiratórios: Vapores de cloro no banho podem agravar asma e bronquite."
    },
    pets: {
      title: "Para os Pets",
      m1: "Sobrecarga Renal: Cães e gatos são 10x mais sensíveis a toxinas e excesso de sódio na água."
    }
  },
  contaminant: {
    label: "Alerta ao Consumidor",
    title: "O Que Você Não Sabe Está Te Custando Caro",
    subtitle: "Você investiu em uma casa linda, mas ainda traz \"inimigos\" para dentro dela através das compras de supermercado.",
    bottleTitle: "A Farsa da Água Engarrafada",
    bottleBody: "Você paga caro por água que, muitas vezes, é apenas água da torneira filtrada. Pior ainda: o plástico libera Ftalatos e BPA quando exposto ao calor.",
    soapTitle: "O Veneno na Lavanderia",
    soapBody: "Sabões tradicionais são feitos à base de petróleo e gordura animal. Eles não limpam; eles \"mascaram\" a sujeira com química sintética.",
    final: "Com Aquafeel + Pure Selects, você elimina 100% desses riscos imediatamente."
  },
  soap: {
    partner: "Parceria Exclusiva",
    title: "Vida Orgânica",
    subtitle: "Elimine produtos químicos agressivos. Nós fornecemos todo o sabão, shampoo e produtos de limpeza que sua casa precisa.",
    features: "100% Orgánico, Hipoalergênico e Seguro para Pets/Crianças.",
    currentSpend: "Seus Gastos Atuais",
    spendSub: "Quanto você deixa no mercado mensalmente?",
    laundry: "Lavanderia",
    kitchen: "Cozinha",
    bathroom: "Banheiro",
    total: "Total Mensual Atual",
    reality: "Realidade Aquafeel",
    market: "Mercado Tradicional",
    freight: "Aquafeel (Frete)",
    referral: "Aquafeel (Recomendação)",
    free: "GRÁTIS",
    note: "*Custo do frete ($390) dividido por 24 meses. Estamos falando de $16.25/mês pela saúde da sua família.",
    howTo: "Como funciona a reposição?",
    howTo1: "O lote inicial dura aprox. 2 anos (família de 4-5 pessoas).",
    howTo2: "Para repor: Recomende 1 família qualificada OU pague apenas o frete ($390).",
    howTo3: "Garantia de 25 anos = Sabão por 25 anos."
  },
  whiteGlove: {
    goldStandard: "Padrão Ouro",
    title: "Protocolo de Excelência Aquafeel",
    subtitle: "Sua nova casa merece respeito. Nossa equipe técnica segue um protocolo rigoroso desenhado para residências de alto padrão.",
    clean: "Ambiente Imaculado",
    cleanSub: "Garantia de limpeza absoluta. Nossa equipe utiliza proteções para o piso e deixa o local mais limpo do que encontrou.",
    priority: "Prioridade de Agenda",
    prioritySub: "Acesso preferencial à agenda técnica, incluindo finais de semana.",
    aesthetic: "Garantia Estética",
    aestheticSub: "Instalação discreta e profissional, preservando o design dos armários.",
    support: "Suporte VIP Dedicado",
    supportSub: "Esqueça call centers. Vocês terão linha direta com o consultor sênior.",
    included: "Incluso no Pacote"
  },
  calculator: {
    problemTitle: "O Dinheiro Invisível",
    problemSub: "Gastos que você já tem hoje",
    waterDrink: "Água para Beber",
    waterCook: "Água para Cozinhar",
    cleaning: "Produtos de Limpeza",
    fillChart: "Preencha o gráfico acima!",
    currentMonthly: "SEU GASTO ATUAL MENSAL",
    waste: "Gasto por toda a sua vida a troco de nada",
    warning: "\"Você já paga pelo sistema, mas está recebendo produtos químicos e plástico em troca.\"",
    solutionTitle: "O Presente de Natal",
    solutionSub: "Dinheiro direto na sua mão",
    difference: "Economia de",
    months: "Meses",
    cash: "À Vista",
    accept: "GARANTIR MEU CASHBACK",
    negotiate: "FALAR COM O HENRIQUE",
    offerValid: "Válido até 25 de Dezembro!",
    offerExpired: "OFERTA ENCERRADA",
    disclaimer: "*consulte seu consultor para maiores informações.",
    benefits: {
      tank: "Sistema Premium de ultra purificação (2 Tanques)",
      ro: "Osmose Reversa Inclusa (Água Alcalina)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Instalação",
      discount: "CASHBACK DE NATAL",
      discountExpired: "Natal já passou",
      payment: "Primeiro Pagamento:",
      paymentDesc: "30 a 45 dias após recebimento das garantias - 2026",
      included: "Incluso",
      standardPrice: "Preço Regular"
    }
  },
  testimonials: {
    title: "Famílias Que Escolheram o Melhor",
    subtitle: "Veja o que outros clientes exigentes dizem sobre a mudança de vida.",
    t1: "Eu duvidei que faria diferença na minha pele, mas em 2 semanas meu cabelo mudou completamente.",
    t2: "Acabamos de comprar nossa casa dos sonhos e não queríamos estragar as tubulações com a água da cidade.",
    t3: "O sabão que eles dão dura uma eternidade e é ótimo. Só a economia de supermercado já pagou metade da parcela."
  },
  faq: {
    transparency: "Transparencia Total",
    title: "Por que NÃO fechar agora?",
    subtitle: "Respondemos as dúvidas que ninguém tem coragem de perguntar.",
    q1: "Como funciona o Cashback de $1.000?",
    a1: "Ao qualificar e instalar seu sistema até dia 25/12, você recebe mil dólares para usar como quiser. É um incentivo real da unidade PA.",
    q2: "Posso usar os $1.000 para abater no valor?",
    a2: "Você pode usar como quiser! O dinheiro é seu. Muitos clientes usam para os presentes de Natal da família.",
    q3: "não quer mais uma conta mensal agora.",
    a3: "Entendemos. Por isso o primeiro pagamento é só em 2026. Com os $1.000 de cashback, você cobre o custo de vida por meses!",
    q4: "Se eu me mudar posso levar o sistema? Quanto vai custar?",
    a4: "Sim, você pode levar o sistema para sua nova casa! Entretanto, para remover o sistema da sua casa com segurança e levar até a outra casa, há um pequeno custo técnico. Este custo pode ser pago por você ou pode ser totalmente bonificado (GRÁTIS) apenas recomendando nosso trabalho para outra família que se qualifique para o programa.",
    q5: "Conheço sistemas mais baratos ou no Home Depot por metade do preço?",
    a5: "Filtros de lojas de varejo são apenas 'filtros de carvão'. Eles retiram o gosto, mas não os contaminantes pesados. O Aquafeel é um sistema de purificação molecular com 25 anos de garantia. Comparar um filtro de loja com Aquafeel é como comparar um ventilador de mesa com um sistema de ar condicionado central.",
    q6: "Isso é um filtro comum?",
    a6: "Não. Filtros comuns apenas reduzem o cloro. Nosso sistema de 2 tanques + Osmose Reversa é uma barreira física de purificação molecular que entrega água alcalina e remove metais pesados, vírus e bactérias que filtros comuns não conseguem tocar."
  },
  urgency: {
    expires: "Natal chegando em:",
    expiredTitle: "OFERTA ENCERRADA",
    commission: "Presente de Natal exclusivo da Aquafeel Solutions PA.",
    limit: "PRAZO FINAL:",
    footer: "Após o dia 25, o bônus de $1.000 cashback será removido.",
    expiredText: "O bônus de $1.000 cashback de Natal encerrou no dia 25/12.",
    expiredButton: "Verificar se ainda há bônus"
  },
  footer: {
    slogan: "Elevando o padrão de vida através da purificação de água.",
    talkTo: "Falar diretamente com seu Consultor",
    button: "Falar com o Henrique",
    rights: "© 2024 Aquafeel Solutions • Proposta Especial de Natal"
  },
  package: {
    title: "Campanha de Natal",
    desc: "O maior benefício já oferecido na história da Aquafeel PA.",
    soapYears: "Anos de Sabão",
    guarantee: "Garantia Total",
    cost: "CASHBACK",
    payment: "Pagamento",
    firstQuota: "Só em 2026"
  }
};

const enTranslations: TranslationStructure = {
  welcome: {
    title: "Welcome",
    subtitle: "Exclusive proposal access",
    restricted: "Restricted Access Area",
    system: "Aquafeel Intelligence System",
    identify: "Please identify yourself to decrypt your proposal.",
    yourName: "YOUR NAME",
    spouseName: "SPOUSE'S NAME (OPTIONAL)",
    placeholderName: "Ex: John Smith",
    placeholderSpouse: "Ex: Mary Smith",
    accessButton: "UNLOCK VIP ACCESS",
    backButton: "Back",
    secure: "Encrypted Security Protocol",
    error: "Identification required to proceed."
  },
  hero: {
    platinum: "Exclusive Christmas Gift",
    welcomeHome: "Aquafeel will give you",
    subtitle: "Qualify for the clean water program before 12/25 and receive a unique gift:",
    systemName: "$1,000 DOLLARS CASHBACK.",
    cashbackTitle: "CHRISTMAS CASHBACK",
    cashbackValue: "+$1,000.00",
    warrantyTitle: "Lifetime Warranty",
    warrantySub: "Limited (25 years)",
    installTitle: "Installation",
    installSub: "Free ($0 Cost)",
    soapTitle: "2 Years of Soap",
    soapSub: "For the whole house",
    paymentTitle: "First Payment",
    paymentSub: "30 to 45 days (2026)",
    penaltyTitle: "No Penalty",
    penaltySub: "Anticipate your payments",
    analysisTitle: "Water Analysis",
    analysisSub: "1x per year (Annual)"
  },
  info: {
    label: "Real Facts, Public Data",
    title: "What's Really in Your Water?",
    subtitle: "Municipal water meets basic regulations, but \"legal\" doesn't mean \"healthy\". Your new home deserves protection.",
    alertTitle: "Regional Alert",
    alertBody: "Recent studies indicate high levels of PFAS (Forever Chemicals), Lead, and Chlorine in local supplies.",
    analysisTitle: "Aquafeel Analysis",
    analysisBody: "Our Double Tank + Reverse Osmosis system is the only real physical barrier between your family and these contaminants.",
    virus: "Eliminates 99.9% of Virus & Bacteria",
    heavyMetals: "Removes Heavy Metals (Lead, Mercury)",
    chlorine: "Neutralizes Chlorine & Chloramines"
  },
  malefices: {
    title: "Top 10 Harmful Effects of Contaminated Water",
    subtitle: "What you don't see is destroying your property and your loved ones' health.",
    home: {
      title: "For the Home",
      m1: "Pipe Corrosion: Heavy metals and chlorine destroy copper and PVC from the inside.",
      m2: "Appliance Death: Limescale and minerals reduce the life of washers and heaters by 50%.",
      m3: "Irreversible Stains: Mineral deposits that destroy the shine of glass, marble, and metals."
    },
    adults: {
      title: "For Adults",
      m1: "Skin and Hair Damage: Chlorine removes natural oils, causing premature aging.",
      m2: "Endocrine Disruptors: PFAS and chemicals affect hormonal balance and metabolism.",
      m3: "Metal Accumulation: Lead and mercury accumulate in the body over decades."
    },
    children: {
      title: "For Children",
      m1: "Developmental Risks: Lead in water is linked to cognitive and growth delays.",
      m2: "Fragile Immunity: Constant exposure to bacteria and viruses that survive common treatment.",
      m3: "Respiratory Issues: Chlorine vapors during showers can aggravate asthma and bronchitis."
    },
    pets: {
      title: "For Pets",
      m1: "Renal Overload: Dogs and cats are 10x more sensitive to toxins and excess sodium in water."
    }
  },
  contaminant: {
    label: "Consumer Alert",
    title: "What You Don't Know Is Costing You",
    subtitle: "You invested in a beautiful home, but you're still bringing \"enemies\" inside through grocery shopping.",
    bottleTitle: "The Bottled Water Scam",
    bottleBody: "You pay high prices for filtered tap water. Worse: plastic releases Phthalates and BPA when exposed to heat.",
    soapTitle: "Poison in the Laundry",
    soapBody: "Traditional soaps are petroleum and animal fat based. They don't clean; they \"mask\" dirt with synthetic chemicals.",
    final: "With Aquafeel + Pure Selects, you eliminate 100% of these risks immediately."
  },
  soap: {
    partner: "Exclusive Partnership",
    title: "Organic Life",
    subtitle: "Eliminate harsh chemicals. We provide all the soap, shampoo, and cleaning products your home needs.",
    features: "100% Organic, Hypoallergenic & Safe for Pets/Kids.",
    currentSpend: "Your Current Spending",
    spendSub: "How much do you leave at the market monthly?",
    laundry: "Laundry",
    kitchen: "Kitchen",
    bathroom: "Bathroom",
    total: "Current Monthly Total",
    reality: "Aquafeel Reality",
    market: "Traditional Market",
    freight: "Aquafeel (Shipping)",
    referral: "Aquafeel (Referral)",
    free: "FREE",
    note: "*Shipping cost ($390) divided by 24 months. That's $16.25/mo for your family's health.",
    howTo: "How does replenishment work?",
    howTo1: "Initial batch lasts approx. 2 years (family of 4-5).",
    howTo2: "To replenish: Refer 1 qualified family OR pay just shipping ($390).",
    howTo3: "25-Year Warranty = Soap for 25 Years."
  },
  whiteGlove: {
    goldStandard: "Gold Standard",
    title: "Aquafeel Excellence Protocol",
    subtitle: "Your new home deserves respect. Our technical team follows a protocol rigorous designed for high-end residences.",
    clean: "Immaculate Environment",
    cleanSub: "Absolute cleanliness guarantee. Our team uses floor protection and leaves the site cleaner than found.",
    priority: "Schedule Priority",
    prioritySub: "Preferential access to technical schedule, including weekends.",
    aesthetic: "Aesthetic Guarantee",
    aestheticSub: "Discreet and professional installation, preserving cabinet design.",
    support: "Dedicated VIP Support",
    supportSub: "Forget call centers. You'll have a direct line to your senior consultant.",
    included: "Included in Package"
  },
  calculator: {
    problemTitle: "Invisible Money",
    problemSub: "Expenses you already have today",
    waterDrink: "Drinking Water",
    waterCook: "Cooking Water",
    cleaning: "Cleaning Products",
    fillChart: "Fill the chart above!",
    currentMonthly: "YOUR CURRENT MONTHLY SPEND",
    waste: "Spent for life with zero return",
    warning: "\"You are already paying for the system, but receiving chemicals and plastic in exchange.\"",
    solutionTitle: "The Christmas Gift",
    solutionSub: "Cash straight into your hand",
    difference: "Savings of",
    months: "Months",
    cash: "Cash",
    accept: "CLAIM MY CASHBACK",
    negotiate: "TALK TO HENRIQUE",
    offerValid: "Valid until Dec 25th!",
    offerExpired: "OFFER EXPIRED",
    disclaimer: "*Consult your representative for more information.",
    benefits: {
      tank: "Ultra-purification Premium System (2 Tanks)",
      ro: "Reverse Osmosis Included (Alkaline Water)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Installation",
      discount: "CHRISTMAS CASHBACK",
      discountExpired: "Christmas is over",
      payment: "First Payment:",
      paymentDesc: "30 to 45 days after receiving warranties - 2026",
      included: "Included",
      standardPrice: "Standard Price"
    }
  },
  testimonials: {
    title: "Families Who Chose the Best",
    subtitle: "See what other demanding clients say about the life change.",
    t1: "I doubted it would make a difference on my skin, but in 2 weeks my hair changed completely.",
    t2: "We just bought our dream home and didn't want to ruin the pipes with city water.",
    t3: "The soap they give lasts forever and is great. The grocery savings alone pay half the bill."
  },
  faq: {
    transparency: "Total Transparency",
    title: "Why NOT close now?",
    subtitle: "We answer the doubts no one has the courage to ask.",
    q1: "How does the $1,000 Cashback work?",
    a1: "By qualifying and installing your system by 12/25, you receive $1,000 to use as you wish. It's a real incentive from our unit.",
    q2: "Can I use the $1,000 to lower the total?",
    a2: "You can use it however you want! It's your money. Many clients use it for family Christmas gifts.",
    q3: "doesn't want another monthly bill right now.",
    a3: "We understand. That's why the first payment is only in 2026. With $1,000 cashback, you cover your costs for months!",
    q4: "If I move can I take the system? How much will it cost?",
    a4: "Yes, you can take the system to your new home! However, to safely remove and transport the system, there is a small technical fee. This cost can be paid by you or can be completely covered (FREE) simply by recommending our work to another family that qualifies for the program.",
    q5: "I know cheaper systems or Home Depot for half the price?",
    a5: "Retail store filters are just carbon filters. They remove taste but not heavy contaminants. Aquafeel is a molecular purification system with a 25-year warranty. Comparing a store filter to Aquafeel is like comparing a table fan to a central AC system.",
    q6: "Is this just a common filter?",
    a6: "No. Common filters only reduce chlorine. Our 2-tank system + Reverse Osmosis is a physical molecular purification barrier that delivers alkaline water and removes heavy metals, viruses, and bacteria that store filters can't touch."
  },
  urgency: {
    expires: "Christmas arriving in:",
    expiredTitle: "OFFER EXPIRED",
    commission: "Exclusive Christmas Gift from Aquafeel Solutions PA.",
    limit: "DEADLINE:",
    footer: "After the timer hits zero, the $1,000 cashback benefit will be removed.",
    expiredText: "The $1,000 Christmas cashback benefit ended on 12/25.",
    expiredButton: "Check for remaining bonuses"
  },
  footer: {
    slogan: "Raising the standard of living through water purification.",
    talkTo: "Speak directly with your Consultant",
    button: "Speak with Henrique",
    rights: "© 2024 Aquafeel Solutions • Christmas Special Proposal"
  },
  package: {
    title: "Christmas Campaign",
    desc: "The biggest benefit ever offered in Aquafeel PA history.",
    soapYears: "Years of Soap",
    guarantee: "Total Warranty",
    cost: "CASHBACK",
    payment: "Payment",
    firstQuota: "Only 2026"
  }
};

const esTranslations: TranslationStructure = {
  welcome: {
    title: "Bienvenido",
    subtitle: "Acceso exclusivo a la propuesta",
    restricted: "Área de Acceso Restringido",
    system: "Aquafeel Intelligence System",
    identify: "Por favor, identifíquese para descifrar su propuesta.",
    yourName: "SU NOMBRE",
    spouseName: "NOMBRE DEL CÓNYUGE (OPCIONAL)",
    placeholderName: "Ej: Juan Pérez",
    placeholderSpouse: "Ej: María Pérez",
    accessButton: "LIBERAR ACCESO VIP",
    backButton: "Volver",
    secure: "Protocolo de Seguridad Cifrado",
    error: "Identificación necesaria para continuar."
  },
  hero: {
    platinum: "Regalo de Navidad Exclusivo",
    welcomeHome: "Aquafeel te dará",
    subtitle: "Califica para el programa de agua limpia antes del 25/12 y recibe un regalo único:",
    systemName: "$1.000 DÓLARES DE CASHBACK.",
    cashbackTitle: "CASHBACK NAVIDAD",
    cashbackValue: "+$1.000,00",
    warrantyTitle: "Garantía Vitalicia",
    warrantySub: "Limitada (25 años)",
    installTitle: "Instalación",
    installSub: "Gratis ($0 Costo)",
    soapTitle: "2 Años de Jabón",
    soapSub: "Para toda la casa",
    paymentTitle: "Primer Pago",
    paymentSub: "30 a 45 días (2026)",
    penaltyTitle: "Sin Penalidad",
    penaltySub: "Anticipe sus pagos",
    analysisTitle: "Análisis de Agua",
    analysisSub: "1x al año (Anual)"
  },
  info: {
    label: "Hechos Reales, Datos Públicos",
    title: "¿Qué hay realmente en su agua?",
    subtitle: "El agua municipal cumple regulaciones básicas, pero \"legal\" no significa \"saludable\". Su casa merece protección.",
    alertTitle: "Alerta Regional",
    alertBody: "Estudios recientes indican altos niveles de PFAS (Químicos Eternos), Plomo y Cloro en las redes locales.",
    analysisTitle: "Análisis Aquafeel",
    analysisBody: "Nuestro sistema de Tanque Doble + Ósmosis Inversa es la única barrera física real entre su familia y estos contaminantes.",
    virus: "Elimina 99.9% de Virus y Bacterias",
    heavyMetals: "Elimina Metales Pesados (Plomo, Mercurio)",
    chlorine: "Neutraliza Cloro e Cloraminas"
  },
  malefices: {
    title: "Top 10 Efectos Nocivos del Agua Contaminada",
    subtitle: "Lo que no ves está destruyendo tu patrimonio y la salud de quienes amas.",
    home: {
      title: "Para la Salud del Hogar",
      m1: "Corrosión de Tuberías: Los metales pesados y el cloro destruyen el cobre y PVC desde el interior.",
      m2: "Muerte de Electrodomésticos: La cal y los minerales reducen la vida de lavadoras y calentadores en un 50%.",
      m3: "Manchas Irreversibles: Depósitos minerales que destruyen el brillo de vidrios, mármoles y metales."
    },
    adults: {
      title: "Para Adultos",
      m1: "Daño en Piel y Cabello: El cloro elimina los aceites naturales, causando envejecimiento prematuro.",
      m2: "Disruptores Endocrinos: PFAS y químicos afectan el equilibrio hormonal y el metabolismo.",
      m3: "Acumulación de Metales: El plomo y el mercurio se acumulan en el organismo durante décadas."
    },
    children: {
      title: "Para Niños",
      m1: "Riesgos en el Desarrollo: El plomo en el agua está ligado a retrasos cognitivos y de crecimiento.",
      m2: "Inmunidad Fragilizada: Exposición constante a bacterias y virus que sobreviven al tratamiento común.",
      m3: "Problemas Respiratorios: Los vapores de cloro durante la ducha pueden agravar el asma y la bronquitis."
    },
    pets: {
      title: "Para Mascotas",
      m1: "Sobrecarga Renal: Perros y gatos son 10 veces más sensibles a las toxinas y al exceso de sodio en el agua."
    }
  },
  contaminant: {
    label: "Alerta al Consumidor",
    title: "Lo que no sabe le está costando caro",
    subtitle: "Invirtió en una casa hermosa, pero sigue trayendo \"enemigos\" adentro a través de las compras de supermercado.",
    bottleTitle: "La Farsa del Agua Embotellada",
    bottleBody: "Paga caro por agua que a menudo es solo agua del grifo filtrada. Peor aún: el plástico libera Ftalatos e BPA.",
    soapTitle: "Veneno en la Lavandería",
    soapBody: "Los jabones tradicionales son a base de petróleo y grasa animal. No limpian; \"enmascaran\" la suciedad con químicos.",
    final: "Con Aquafeel + Pure Selects, elimina el 100% de estos riesgos inmediatamente."
  },
  soap: {
    partner: "Alianza Exclusiva",
    title: "Vida Orgánica",
    subtitle: "Elimine químicos agresivos. Suministramos todo el jabón, champú y productos de limpieza que su casa necesita.",
    features: "100% Orgánico, Hipoalergénico y Seguro para Mascotas/Niños.",
    currentSpend: "Sus Gastos Actuales",
    spendSub: "¿Cuánto deja en el mercado mensualmente?",
    laundry: "Lavandería",
    kitchen: "Cocina",
    bathroom: "Baño",
    total: "Total Mensual Actual",
    reality: "Realidad Aquafeel",
    market: "Mercado Tradicional",
    freight: "Aquafeel (Envío)",
    referral: "Aquafeel (Recomendación)",
    free: "GRATIS",
    note: "*Costo de envío ($390) dividido por 24 meses. Son $16.25/mes por la salud de su familia.",
    howTo: "¿Cómo funciona la reposición?",
    howTo1: "El lote inicial dura aprox. 2 años (familia de 4-5).",
    howTo2: "Para reponer: Recomiende 1 familia calificada O pague solo el envío ($390).",
    howTo3: "Garantía de 25 años = Jabón por 25 años."
  },
  whiteGlove: {
    goldStandard: "Estándar de Oro",
    title: "Protocolo de Excelencia Aquafeel",
    subtitle: "Su nueva casa merece respeto. Nuestro equipo técnico sigue un protocolo riguroso para residências de alto nivel.",
    clean: "Ambiente Impecable",
    cleanSub: "Garantía de limpieza absoluta. Usamos protección para el piso y dejamos el lugar más limpio de lo que lo encontramos.",
    priority: "Prioridad de Agenda",
    prioritySub: "Acceso preferencial a la agenda técnica, incluyendo fines de semana.",
    aesthetic: "Garantía Estética",
    aestheticSub: "Instalación discreta y profesional, preservando el diseño de los gabinetes.",
    support: "Soporte VIP Dedicado",
    supportSub: "Olvide los call centers. Tendrán línea directa con el consultor senior.",
    included: "Incluido en el Paquete"
  },
  calculator: {
    problemTitle: "Dinero Invisible",
    problemSub: "Gastos que ya tiene hoy",
    waterDrink: "Agua para Beber",
    waterCook: "Agua para Cocinar",
    cleaning: "Productos de Limpieza",
    fillChart: "¡Complete el gráfico arriba!",
    currentMonthly: "SU GASTO MENSUAL ACTUAL",
    waste: "Gasto de por vida sin retorno",
    warning: "\"Ya están pagando por el sistema, pero recibiendo químicos y plástico a cambio.\"",
    solutionTitle: "El Regalo de Navidad",
    solutionSub: "Dinero directo en su mano",
    difference: "Ahorro de",
    months: "Meses",
    cash: "Al Contado",
    accept: "RECLAMAR MI CASHBACK",
    negotiate: "HABLAR CON HENRIQUE",
    offerValid: "¡Válido hasta el 25 de Dic!",
    offerExpired: "OFERTA EXPIRADA",
    disclaimer: "*Consulte a su consultor para mayor información.",
    benefits: {
      tank: "Sistema Premium de ultra purificación (2 Tanques)",
      ro: "Ósmosis Inversa Incluida (Agua Alcalina)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Instalación",
      discount: "CASHBACK NAVIDAD",
      discountExpired: "Navidad ya pasó",
      payment: "Primer Pago:",
      paymentDesc: "30 a 45 días después de recibir garantías - 2026",
      included: "Incluido",
      standardPrice: "Precio Regular"
    }
  },
  testimonials: {
    title: "Familias que Eligieron lo Mejor",
    subtitle: "Vea lo que otros clientes exigentes dicen sobre el cambio de vida.",
    t1: "Dudé que hiciera diferencia en mi piel, pero en 2 semanas mi cabello cambió completamente.",
    t2: "Acabamos de comprar nuestra casa de ensueño y no queríamos arruinar las tuberías con agua de la ciudad.",
    t3: "El jabón que dan dura una eternidad y es genial. Solo el ahorro de supermercado ya pagó la mitad de la cuota."
  },
  faq: {
    transparency: "Transparencia Total",
    title: "¿Por qué NO cerrar ahora?",
    subtitle: "Respondemos las dudas que nadie tiene el coraje de preguntar.",
    q1: "¿Cómo funciona el Cashback de $1.000?",
    a1: "Al calificar e instalar su sistema antes del 25/12, recibe mil dólares para usar como quiera. Es un incentivo real de nuestra unidad.",
    q2: "¿Puedo usar los $1.000 para bajar el total?",
    a2: "¡Puede usarlo como quiera! El dinero es suyo. Muchos clientes lo usan para los regalos de Navidad.",
    q3: "no quiere otra cuenta mensual ahora.",
    a3: "Entendemos. Por eso el primer pago es solo en 2026. Con los $1.000 de cashback, cubre sus gastos por meses.",
    q4: "¿Si me mudo puedo llevar el sistema? ¿Cuánto costará?",
    a4: "¡Sí, puedes llevar el sistema a tu nueva casa! Sin embargo, para desmontar y transportar el sistema de forma segura, hay un pequeño costo técnico. Este costo puede ser pagado por usted o puede ser totalmente bonificado (GRATIS) simplemente recomendando nuestro trabajo a otra familia calificada.",
    q5: "¿Conozco sistemas más baratos o en Home Depot por mitad de precio?",
    a5: "Los filtros de las tiendas son solo filtros de carbón. Quitan el sabor pero no los contaminantes pesados. Aquafeel es un sistema de purificación molecular con 25 años de garantia. Comparar un filtro de tienda con Aquafeel es como comparar un ventilador de mesa con un aire acondicionado central.",
    q6: "¿Es esto un filtro común?",
    a6: "No. Los filtros comunes solo reducen el cloro. Nuestro sistema de 2 tanques + Ósmosis Inversa es una barrera física de purificação molecular que entrega água alcalina y elimina metales pesados, virus y bactérias que los filtros comunes no pueden tocar."
  },
  urgency: {
    expires: "Navidad llega en:",
    expiredTitle: "OFERTA EXPIRADA",
    commission: "Regalo de Navidad exclusivo de Aquafeel Solutions PA.",
    limit: "PLAZO FINAL:",
    footer: "Después del 25, el beneficio de $1.000 cashback será eliminado.",
    expiredText: "El beneficio de $1.000 cashback de Navidad terminó el 25/12.",
    expiredButton: "Verificar si hay bonos restantes"
  },
  footer: {
    slogan: "Elevando el nivel de vida a través de la purificación del agua.",
    talkTo: "Hablar directamente con su Consultor",
    button: "Hablar con Henrique",
    rights: "© 2024 Aquafeel Solutions • Propuesta Especial de Navidad"
  },
  package: {
    title: "Campaña de Navidad",
    desc: "El mayor beneficio jamás ofrecido en la historia de Aquafeel PA.",
    soapYears: "Años de Jabón",
    guarantee: "Garantía Total",
    cost: "CASHBACK",
    payment: "Pago",
    firstQuota: "Solo 2026"
  }
};

export const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
};