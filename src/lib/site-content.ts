import logo from '@/assets/logo.png.asset.json';
import about from '@/assets/about.png.asset.json';
import signature from '@/assets/signature.png.asset.json';
import bronze from '@/assets/bronze.png.asset.json';
import massagens from '@/assets/massagens.png.asset.json';
import faciais from '@/assets/faciais.png.asset.json';
import olhar from '@/assets/olhar.png.asset.json';
import pes from '@/assets/pes.png.asset.json';
import especiais from '@/assets/especiais.png.asset.json';
import space1 from '@/assets/space-1.png.asset.json';
import space2 from '@/assets/space-2.png.asset.json';
import space3 from '@/assets/space-3.png.asset.json';
import booking from '@/assets/booking.png.asset.json';
import map from '@/assets/map.png.asset.json';
import avatar1 from '@/assets/avatar-1.png.asset.json';
import avatar2 from '@/assets/avatar-2.png.asset.json';
import avatar3 from '@/assets/avatar-3.png.asset.json';
import hero from '@/assets/hero-clean.png';

// Conteúdo separado da apresentação: textos, fotos e contatos podem ser editados aqui.
export const site = {
  name: 'Paula Medeiros Estética',
  heroTitle: 'A luz que se veste na pele.',
  heroDescription: 'Bronzeamento natural, cuidados estéticos e bem-estar para realçar o que já existe de mais bonito em você.',
  instagram: 'https://www.instagram.com/paulabronze.estetica/',
  phoneLabel: '(82) 9984-2118',
  whatsappNumber: '', // Confirmar o número completo: a referência parece ter um dígito ausente.
  address: 'Rua Arlindo Ferreira de Aguiar, 182, Senador Arnon de Melo, Arapiraca - AL, CEP 57315-120',
  days: 'Segunda a Sábado',
  hours: '08h às 19h',
  about: [
    'Sou Paula Medeiros, especialista em bronzeamento e estética, e acredito que a beleza vai muito além da aparência. É sobre autoestima, bem-estar e se sentir bem na própria pele.',
    'Aqui, você encontra um espaço seguro, acolhedor e pensado especialmente para você.',
  ],
  images: { logo: logo.url, hero, about: about.url, signature: signature.url, booking: booking.url, map: map.url },
};

export const navigation = [
  { label: 'Início', id: 'inicio' },
  { label: 'Sobre a Paula', id: 'sobre' },
  { label: 'Serviços', id: 'servicos' },
  { label: 'Espaço', id: 'espaco' },
  { label: 'Depoimentos', id: 'depoimentos' },
  { label: 'Contato', id: 'contato' },
];

export const services = [
  { id: 'bronze', title: 'Bronzeamento', description: 'Bronzeamento natural, biquíni de fita e opções personalizadas.', image: bronze.url, items: ['Bronze Sol', 'Bronze Premium', 'Bronze Redux', 'Bronze Orgânico Virgínia'] },
  { id: 'massagens', title: 'Massagens Corporais', description: 'Relaxamento, detox, redução de medidas e muito mais.', image: massagens.url, items: ['Massagem Linfática', 'Detox Corpo Inteiro', 'Detox Abdominal', 'Massagem Redux', 'Massagem Relaxante', 'Massagem Humanizada'] },
  { id: 'faciais', title: 'Tratamentos Faciais', description: 'Limpeza de pele, hidratação e rejuvenescimento.', image: faciais.url, items: ['Limpeza de Pele Essencial', 'Limpeza de Pele Profunda'] },
  { id: 'olhar', title: 'Olhar', description: 'Designer de sobrancelhas, henna e extensão de cílios.', image: olhar.url, items: ['Designer de Sobrancelhas', 'Designer com Henna', 'Extensão de Cílios'] },
  { id: 'pes', title: 'Spa dos Pés', description: 'Cuidado e bem-estar para os seus pés.', image: pes.url, items: ['Plástica dos Pés', 'Escalda-Pés', 'Escalda-Pés com Massagem'] },
  { id: 'especiais', title: 'Experiências Especiais', description: 'Programas completos para seu bem-estar.', image: especiais.url, items: ['Experiência Leveza', 'Experiência Redux', 'Experiência Relax', 'Experiência Termal'] },
];
export type Service = (typeof services)[number];

export const spaceImages = [
  { image: space1.url, alt: 'Recepção do espaço Paula Medeiros' },
  { image: space2.url, alt: 'Sala de tratamentos do espaço Paula Medeiros' },
  { image: space3.url, alt: 'Ambiente de acolhimento do espaço Paula Medeiros' },
];

// Depoimentos transcritos da referência enviada; não são avaliações verificadas por uma plataforma externa.
export const testimonials = [
  { name: 'Juliana S.', image: avatar1.url, text: 'O bronzeamento da Paula é incrível! A pele fica linda, natural e super uniforme. Sem contar o atendimento, que é impecável!' },
  { name: 'Camila R.', image: avatar2.url, text: 'Me sinto outra mulher depois de cada sessão. O cuidado, o ambiente e o profissionalismo são diferenciais!' },
  { name: 'Mariana L.', image: avatar3.url, text: 'É muito mais que estética, é autoestima! Cada visita é uma experiência única.' },
];