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
    platinum: "Oferta VIP Exclusiva",
    welcomeHome: "A Aquafeel vai te dar",
    subtitle: "Qualifique-se para o programa de água limpa e receba um benefício único:",
    systemName: "3 MESES LIVRES DE PAGAMENTO.",
    cashbackTitle: "CARÊNCIA TOTAL",
    cashbackValue: "3 MESES GRÁTIS",
    warrantyTitle: "Garantia Vitalícia",
    warrantySub: "Limitada (25 anos)",
    installTitle: "Instalação",
    installSub: "Grátis ($0 Custo)",
    soapTitle: "2 Anos de Sabão",
    soapSub: "Para toda a casa",
    paymentTitle: "Primeiro Pagamento",
    paymentSub: "No 4º mês (90 dias)",
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
    quote: "A qualidade da água que entra em sua casa define a longevidade da sua família e do seu investimento imobiliário.",
    home: {
      title: "Para a Saúde do Lar",
      m1: "Corrosão das Tubulações: Metais pesados e cloro destroem o cobre e PVC por dentro.",
      m2: "Morte de Eletrodomésticos: Calcário e minerais reduzem a vida de máquinas e aquecedores em 50%.",
      m3: "Manchas Irreversíveis: Depósitos minerais que destroem o brilho de vidros, mármores e metais."
    },
    adults: {
      title: "Para os Adultos",
      m1: "Danos à Pele e Cabelo: O cloro remove a oleosidade natural, causando envelhecimento precoce.",
      m2: "Desreguladores Endócrinos: PFAS and químicos afetam o equilíbrio hormonal e metabolismo.",
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
      m1: "Sobrecarga Renal: Cães e gatos são 10x mais sensíveis a toxinas e excesso de sódio na água.",
      m2: "Cálculos Urinários: O excesso de minerais na água \"dura\" é o principal causador de pedras na bexiga e rins em pets.",
      m3: "Dermatites e Queda de Pelos: O cloro e calcário removem a proteção natural da pele, causando irritação e pelagem quebradiça."
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
    learnMore: "Saiba mais em:",
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
    solutionTitle: "Oferta de Ativação",
    solutionSub: "Benefício direto para sua família",
    selectRegion: "Selecione sua Localização:",
    difference: "Economia de",
    months: "Meses",
    cash: "À Vista",
    accept: "GARANTIR 3 MESES GRÁTIS",
    negotiate: "FALAR COM O HENRIQUE",
    offerValid: "Válido por tempo limitado!",
    offerExpired: "OFERTA ENCERRADA",
    disclaimer: "*consulte seu consultor para maiores informações.",
    benefits: {
      tank: "Sistema Premium de ultra purificação (2 Tanques)",
      ro: "Osmose Reversa Inclusa (Água Alcalina)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Instalacão",
      discount: "3 MESES GRÁTIS",
      discountExpired: "Promoção encerrada",
      payment: "Primeiro Pagamento:",
      paymentDesc: "Só após 90 dias - Comece a pagar no 4º mês",
      included: "Incluso",
      standardPrice: "Preço Regular"
    }
  },
  modal: {
    title: "Selecione seu Analista de Água",
    subtitle: "Com quem você gostaria de falar para ativar seu benefício?",
    confirmTitle: "Confirmar Seleção",
    confirmMessage: "Você deseja se conectar com {name}?",
    yes: "Sim, conectar agora",
    no: "Não, escolher outro"
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
    q1: "Como funcionam os 3 meses grátis?",
    a1: "Ao qualificar seu sistema hoje, você recebe uma carência total. Sua primeira parcela será apenas no 4º mês após a instalação.",
    q2: "Posso pagar à vista com desconto?",
    a2: "Sim! Para pagamentos à vista, oferecemos uma condição diferenciada que equivale ao benefício das parcelas livres.",
    q3: "não quer mais uma conta mensal agora.",
    a3: "Entendemos. Por isso você tem 3 meses de folga total. Comece a pagar apenas quando já estiver sentindo a economia no bolso!",
    q4: "Se eu me mudar posso levar o sistema? Quanto vai custar?",
    a4: "Sim, você pode levar o sistema para sua nova casa! Entretanto, para remover o sistema da sua casa com segurança e levar até a outra casa, há um pequeno custo técnico. Este custo pode ser pago por você ou pode ser totalmente bonificado (GRÁTIS) apenas recomendando nosso trabalho para outra família que se qualifique para o programa.",
    q5: "Conheço sistemas mais baratos ou no Home Depot por metade do preço?",
    a5: "Filtros de lojas de varejo são apenas 'filtros de carvão'. Eles retiram o gosto, mas não os contaminantes pesados. O Aquafeel é um sistema de purificação molecular com 25 anos de garantia. Comparar um filtro de loja com Aquafeel é como comparar um ventilador de mesa com um sistema de ar condicionado central.",
    q6: "Isso é um filtro comum?",
    a6: "Não. Filtros comuns apenas reduzem o cloro. Nosso sistema de 2 tanques + Osmose Reversa é uma barreira física de purificação molecular que entrega água alcalina e remove metais pesados, vírus e bactérias que filtros comuns não conseguem tocar."
  },
  urgency: {
    expires: "Oferta expira em:",
    expiredTitle: "OFERTA ENCERRADA",
    commission: "Benefício exclusivo da Aquafeel Solutions PA.",
    limit: "PRAZO FINAL:",
    footer: "Após o prazo, o benefício de 3 meses grátis será removido.",
    expiredText: "O benefício de ativação encerrou.",
    expiredButton: "Verificar disponibilidade"
  },
  footer: {
    slogan: "Elevando o padrão de vida através da purificação de água.",
    talkTo: "Falar diretamente com seu Consultor",
    button: "Falar com o Henrique",
    rights: "© 2024 Aquafeel Solutions • Proposta Especial de Ativação"
  },
  package: {
    title: "Promoção de Ativação",
    desc: "O maior benefício já oferecido na história da Aquafeel PA.",
    soapYears: "Anos de Sabão",
    guarantee: "Garantia Total",
    cost: "3 MESES FREE",
    payment: "Pagamento",
    firstQuota: "Só no 4º mês"
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
    platinum: "Exclusive VIP Offer",
    welcomeHome: "Aquafeel will give you",
    subtitle: "Qualify for the clean water program and receive a unique benefit:",
    systemName: "3 MONTHS PAYMENT FREE.",
    cashbackTitle: "TOTAL GRACE PERIOD",
    cashbackValue: "3 MONTHS FREE",
    warrantyTitle: "Lifetime Warranty",
    warrantySub: "Limited (25 years)",
    installTitle: "Installation",
    installSub: "Free ($0 Cost)",
    soapTitle: "2 Years of Soap",
    soapSub: "For the whole house",
    paymentTitle: "First Payment",
    paymentSub: "On the 4th month (90 days)",
    penaltyTitle: "No Penalty",
    penaltySub: "Anticipate your payments",
    analysisTitle: "Water Analysis",
    analysisSub: "1x per year (Annual)"
  },
  info: {
    label: "Real Facts, Public Data",
    title: "What's Really in Your Water?",
    subtitle: "Municipal water meets basic regulations, but \"legal\" doesn't mean \"healthy\". Your new home deserves protection against modern contaminants.",
    alertTitle: "Regional Alert",
    alertBody: "Recent studies indicate high levels of PFAS (Forever Chemicals), Lead, and Chlorine in local supplies. These compounds accumulate in the body and pipes.",
    analysisTitle: "Aquafeel Analysis",
    analysisBody: "Our Double Tank + Reverse Osmosis system is the only real physical barrier between your family and these contaminants.",
    virus: "Eliminates 99.9% of Virus & Bacteria",
    heavyMetals: "Removes Heavy Metals (Lead, Mercury)",
    chlorine: "Neutralizes Chlorine & Chloramines"
  },
  malefices: {
    title: "Top 10 Harmful Effects of Contaminated Water",
    subtitle: "What you don't see is destroying your property and your loved ones' health.",
    quote: "The quality of the water that enters your home defines the longevity of your family and your real estate investment.",
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
      m1: "Renal Overload: Dogs and cats are 10x more sensitive to toxins and excess sodium in water.",
      m2: "Urinary Stones: Excess minerals in \"hard\" water is the primary cause of bladder and kidney stones in pets.",
      m3: "Dermatitis & Hair Loss: Chlorine and limescale remove natural skin protection, causing irritation and brittle coats."
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
    learnMore: "Learn more at:",
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
    solutionTitle: "Activation Offer",
    solutionSub: "Direct benefit for your family",
    selectRegion: "Select your Location:",
    difference: "Savings of",
    months: "Months",
    cash: "Cash",
    accept: "CLAIM 3 MONTHS FREE",
    negotiate: "TALK TO HENRIQUE",
    offerValid: "Valid for a limited time!",
    offerExpired: "OFFER EXPIRED",
    disclaimer: "*Consult your representative for more information.",
    benefits: {
      tank: "Ultra-purification Premium System (2 Tanks)",
      ro: "Reverse Osmosis Included (Alkaline Water)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Installation",
      discount: "3 MONTHS FREE",
      discountExpired: "Promotion ended",
      payment: "First Payment:",
      paymentDesc: "Only after 90 days - Start paying on the 4th month",
      included: "Included",
      standardPrice: "Standard Price"
    }
  },
  modal: {
    title: "Select your Water Analyst",
    subtitle: "Who would you like to speak with to activate your benefit?",
    confirmTitle: "Confirm Selection",
    confirmMessage: "Do you want to connect with {name}?",
    yes: "Yes, connect now",
    no: "No, choose another"
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
    q1: "How do the 3 free months work?",
    a1: "By qualifying your system today, you receive a full grace period. Your first installment will be only in the 4th month after installation.",
    q2: "Can I pay in cash with a discount?",
    a2: "Yes! For cash payments, we offer a special condition equivalent to the free monthly payments benefit.",
    q3: "doesn't want another monthly bill right now.",
    a3: "We understand. That's why you have 3 months of total break. Start paying only when you're already feeling the savings in your pocket!",
    q4: "If I move can I take the system? How much will it cost?",
    a4: "Yes, you can take the system to your new home! However, to safely remove and transport the system, there is a small technical fee. This cost can be paid by you or can be completely covered (FREE) simply by recommending our work to another family that qualifies for the program.",
    q5: "I know cheaper systems or Home Depot for half the price?",
    a5: "Retail store filters are just carbon filters. They remove taste but not heavy contaminants. Aquafeel is a molecular purification system with a 25-year warranty. Comparing a store filter to Aquafeel is like comparing a table fan to a central AC system.",
    q6: "Is this just a common filter?",
    a6: "No. Common filters only reduce chlorine. Our 2-tank system + Reverse Osmosis is a physical molecular purification barrier that delivers alkaline water and removes heavy metals, viruses, and bacteria that store filters can't touch."
  },
  urgency: {
    expires: "Offer expires in:",
    expiredTitle: "OFFER EXPIRED",
    commission: "Exclusive benefit from Aquafeel Solutions PA.",
    limit: "DEADLINE:",
    footer: "After the timer hits zero, the 3 months free benefit will be removed.",
    expiredText: "The activation benefit has ended.",
    expiredButton: "Check availability"
  },
  footer: {
    slogan: "Raising the standard of living through water purification.",
    talkTo: "Speak directly with your Consultant",
    button: "Speak with Henrique",
    rights: "© 2024 Aquafeel Solutions • Special Activation Proposal"
  },
  package: {
    title: "Activation Campaign",
    desc: "The biggest benefit ever offered in Aquafeel PA history.",
    soapYears: "Years of Soap",
    guarantee: "Total Warranty",
    cost: "3 MONTHS FREE",
    payment: "Payment",
    firstQuota: "Only 4th month"
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
    platinum: "Oferta VIP Exclusiva",
    welcomeHome: "Aquafeel te dará",
    subtitle: "Califica para el programa de agua limpia y recibe un beneficio único:",
    systemName: "3 MESES LIBRES DE PAGO.",
    cashbackTitle: "PERÍODO DE GRACIA",
    cashbackValue: "3 MESES GRATIS",
    warrantyTitle: "Garantía Vitalicia",
    warrantySub: "Limitada (25 años)",
    installTitle: "Instalación",
    installSub: "Gratis ($0 Costo)",
    soapTitle: "2 Años de Jabón",
    soapSub: "Para toda la casa",
    paymentTitle: "Primer Pago",
    paymentSub: "En el 4º mes (90 dias)",
    penaltyTitle: "Sin Penalidad",
    penaltySub: "Anticipe sus pagos",
    analysisTitle: "Análisis de Agua",
    analysisSub: "1x al año (Anual)"
  },
  info: {
    label: "Hechos Reales, Dados Públicos",
    title: "¿Qué hay realmente en su agua?",
    subtitle: "El agua municipal cumple regulaciones básicas, mas \"legal\" no significa \"saludable\". Su casa merece protección.",
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
    quote: "La calidad del agua que entra en su casa define la longevidad de su familia y de su inversión inmobiliaria.",
    home: {
      title: "En el Hogar",
      m1: "Corrosión de Tuberías: Los metales pesados y el cloro destruyen el cobre y PVC desde el interior.",
      m2: "Muerte de Electrodomésticos: La cal y los minerales reducen la vida de lavadoras y calentadores en un 50%.",
      m3: "Manchas Irreversibles: Depósitos minerales que destruyen el brillo de vidrios, mármoles y metales."
    },
    adults: {
      title: "En Adultos",
      m1: "Daño en Piel y Cabello: El cloro elimina los aceites naturales, causando envejecimiento prematuro.",
      m2: "Disruptores Endocrinos: PFAS y químicos afectan el equilibrio hormonal y el metabolismo.",
      m3: "Acumulación de Metales: El plomo y el mercurio se acumulan en el organismo durante décadas."
    },
    children: {
      title: "En Niños",
      m1: "En Niños",
      m2: "Inmunidad Fragilizada: Exposición constante a bacterias y virus que sobrevivem al tratamiento común.",
      m3: "Problemas Respiratorios: Los vapores de cloro durante la ducha pueden agravar el asma y la bronquitis."
    },
    pets: {
      title: "En Mascotas",
      m1: "En Mascotas",
      m2: "Cálculos Urinarios: El exceso de minerales en el agua \"dura\" es el principal causante de piedras en la vejiga y riñones en mascotas.",
      m3: "Dermatitis y Caída de Pelo: El cloro y el sarro eliminan la protección natural de la piel, causando irritación y pelaje quebradizo."
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
    title: "Vida Orgânica",
    subtitle: "Elimine químicos agressivos. Suministramos todo el jabón, champú y productos de limpeza que su casa necesita.",
    features: "100% Orgánico, Hipoalergênico y Seguro para Mascotas/Niños.",
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
    learnMore: "Más información en:",
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
    aesthetic: "Garantia Estética",
    aestheticSub: "Instalación discreta e profesional, preservando el diseño de los gabinetes.",
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
    solutionTitle: "Oferta de Activación",
    solutionSub: "Beneficio directo para su familia",
    selectRegion: "Seleccione su Ubicación:",
    difference: "Ahorro de",
    months: "Meses",
    cash: "Al Contado",
    accept: "GARANTIZAR 3 MESES GRATIS",
    negotiate: "HABLAR CON HENRIQUE",
    offerValid: "¡Válido por tiempo limitado!",
    offerExpired: "OFERTA EXPIRADA",
    disclaimer: "*Consulte a su consultor para mayor información.",
    benefits: {
      tank: "Sistema Premium de ultra purificación (2 Tanques)",
      ro: "Ósmosis Inversa Incluida (Agua Alcalina)",
      downpayment: "0 Downpayment",
      taxes: "0 Taxes",
      installation: "0 Instalación",
      discount: "3 MESES GRATIS",
      discountExpired: "Promoción terminada",
      payment: "Primer Pago:",
      paymentDesc: "Solo después de 90 días - Empiece a pagar en el 4º mes",
      included: "Incluido",
      standardPrice: "Precio Regular"
    }
  },
  modal: {
    title: "Seleccione su Analista de Agua",
    subtitle: "¿Con quién le gustaría hablar para activar su beneficio?",
    confirmTitle: "Confirmar Selección",
    confirmMessage: "¿Desea conectarse con {name}?",
    yes: "Sí, conectar ahora",
    no: "No, elegir otro"
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
    q1: "¿Cómo funcionan los 3 meses gratis?",
    a1: "Al calificar su sistema hoy, recibe un período de gracia total. Su primera cuota será recién en el 4º mes después de la instalación.",
    q2: "¿Puedo pagar al contado con descuento?",
    a2: "¡Sí! Para pagos al contado, ofrecemos una condición especial equivalente al beneficio de las mensualidades libres.",
    q3: "no quiere otra cuenta mensual ahora.",
    a3: "Entendemos. Por eso tiene 3 meses de descanso total. ¡Empiece a pagar solo cuando ya esté sintiendo el ahorro en su bolsillo!",
    q4: "¿Si me mudo puedo llevar el sistema? ¿Cuánto costará?",
    a4: "¡Sí, puedes llevar el sistema a tu nueva casa! Sin embargo, para desmontar y transportar el sistema de forma segura, hay un pequeño costo técnico. Este costo puede ser pagado por usted o puede ser totalmente bonificado (GRÁTIS) simplemente recomendando nuestro trabajo a otra familia calificada.",
    q5: "¿Conozco sistemas más baratos o en Home Depot por mitad de precio?",
    a5: "Los filtros de las tiendas son solo filtros de carbón. Quitan el sabor pero no los contaminantes pesados. Aquafeel es un sistema de purificación molecular con 25 años de garantia. Comparar un filtro de tienda con Aquafeel es como comparar un ventilador de mesa con un aire acondicionado central.",
    q6: "¿Es esto un filtro común?",
    a6: "No. Los filtros comunes solo reducen el cloro. Nuestro sistema de 2 tanques + Ósmosis Inversa es una barrera física de purificación molecular que entrega agua alcalina y elimina metales pesados, virus y bactérias que los filtros comunes no pueden tocar."
  },
  urgency: {
    expires: "Oferta expira en:",
    expiredTitle: "OFERTA EXPIRADA",
    commission: "Beneficio exclusivo de Aquafeel Solutions PA.",
    limit: "PLAZO FINAL:",
    footer: "Después del plazo, el beneficio de 3 meses gratis será eliminado.",
    expiredText: "El beneficio de activación ha terminado.",
    expiredButton: "Verificar disponibilidad"
  },
  footer: {
    slogan: "Elevando el nivel de vida a través de la purificación del agua.",
    talkTo: "Hablar directamente con su Consultor",
    button: "Hablar com Henrique",
    rights: "© 2024 Aquafeel Solutions • Propuesta Especial de Activación"
  },
  package: {
    title: "Campaña de Activación",
    desc: "El mayor beneficio jamás ofrecido en la historia de Aquafeel PA.",
    soapYears: "Años de Jabón",
    guarantee: "Garantía Total",
    cost: "3 MESES FREE",
    payment: "Pago",
    firstQuota: "Solo 4º mes"
  }
};

export const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
};