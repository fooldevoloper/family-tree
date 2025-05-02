import { Edge } from '@xyflow/react';
import { FamilyNode } from '../types/family';

export const britishRoyalFamilyNodes: FamilyNode[] = [
  {
    id: 'queen-elizabeth-ii',
    type: 'parent',
    position: { x: 0, y: 0 },
    data: {
      id: 'queen-elizabeth-ii',
      name: 'Queen Elizabeth II',
      label: 'Queen Elizabeth II (1926-2022)',
      position: { x: 0, y: 0 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Queen_Elizabeth_II_in_March_2015.jpg/220px-Queen_Elizabeth_II_in_March_2015.jpg',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'prince-philip',
    type: 'spouse',
    position: { x: 300, y: 0 },
    data: {
      id: 'prince-philip',
      name: 'Prince Philip',
      label: 'Prince Philip (1921-2021)',
      position: { x: 300, y: 0 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Prince_Philip%2C_Duke_of_Edinburgh.jpg/220px-Prince_Philip%2C_Duke_of_Edinburgh.jpg',
      parentId: 'queen-elizabeth-ii',
    },
  },
  {
    id: 'king-charles-iii',
    type: 'child',
    position: { x: 150, y: 200 },
    data: {
      id: 'king-charles-iii',
      name: 'King Charles III',
      label: 'King Charles III (b. 1948)',
      position: { x: 150, y: 200 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Charles%2C_Prince_of_Wales_%28cropped%29.jpg/220px-Charles%2C_Prince_of_Wales_%28cropped%29.jpg',
      parentId: 'queen-elizabeth-ii',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'princess-diana',
    type: 'spouse',
    position: { x: 450, y: 200 },
    data: {
      id: 'princess-diana',
      name: 'Princess Diana',
      label: 'Princess Diana (1961-1997)',
      position: { x: 450, y: 200 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Diana%2C_Princess_of_Wales_%28d._1997%29.jpg/220px-Diana%2C_Princess_of_Wales_%28d._1997%29.jpg',
      parentId: 'king-charles-iii',
    },
  },
  {
    id: 'camilla',
    type: 'spouse',
    position: { x: 600, y: 200 },
    data: {
      id: 'camilla',
      name: 'Queen Camilla',
      label: 'Queen Camilla (b. 1947)',
      position: { x: 600, y: 200 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Camilla%2C_Duchess_of_Cornwall_%28cropped%29.jpg/220px-Camilla%2C_Duchess_of_Cornwall_%28cropped%29.jpg',
      parentId: 'king-charles-iii',
    },
  },
  {
    id: 'prince-william',
    type: 'child',
    position: { x: 300, y: 400 },
    data: {
      id: 'prince-william',
      name: 'Prince William',
      label: 'Prince William (b. 1982)',
      position: { x: 300, y: 400 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Prince_William_%28cropped%29.jpg/220px-Prince_William_%28cropped%29.jpg',
      parentId: 'king-charles-iii',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'kate-middleton',
    type: 'spouse',
    position: { x: 600, y: 400 },
    data: {
      id: 'kate-middleton',
      name: 'Kate Middleton',
      label: 'Princess of Wales (b. 1982)',
      position: { x: 600, y: 400 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Catherine%2C_Princess_of_Wales_%28cropped%29.jpg/220px-Catherine%2C_Princess_of_Wales_%28cropped%29.jpg',
      parentId: 'prince-william',
    },
  },
  {
    id: 'prince-george',
    type: 'child',
    position: { x: 450, y: 600 },
    data: {
      id: 'prince-george',
      name: 'Prince George',
      label: 'Prince George (b. 2013)',
      position: { x: 450, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Prince_George_of_Wales_%28cropped%29.jpg/220px-Prince_George_of_Wales_%28cropped%29.jpg',
      parentId: 'prince-william',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'princess-charlotte',
    type: 'child',
    position: { x: 600, y: 600 },
    data: {
      id: 'princess-charlotte',
      name: 'Princess Charlotte',
      label: 'Princess Charlotte (b. 2015)',
      position: { x: 600, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Princess_Charlotte_of_Wales_%28cropped%29.jpg/220px-Princess_Charlotte_of_Wales_%28cropped%29.jpg',
      parentId: 'prince-william',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'prince-louis',
    type: 'child',
    position: { x: 750, y: 600 },
    data: {
      id: 'prince-louis',
      name: 'Prince Louis',
      label: 'Prince Louis (b. 2018)',
      position: { x: 750, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Prince_Louis_of_Wales_%28cropped%29.jpg/220px-Prince_Louis_of_Wales_%28cropped%29.jpg',
      parentId: 'prince-william',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'prince-harry',
    type: 'child',
    position: { x: 900, y: 400 },
    data: {
      id: 'prince-harry',
      name: 'Prince Harry',
      label: 'Prince Harry (b. 1984)',
      position: { x: 900, y: 400 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Prince_Harry%2C_Duke_of_Sussex_%28cropped%29.jpg/220px-Prince_Harry%2C_Duke_of_Sussex_%28cropped%29.jpg',
      parentId: 'king-charles-iii',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'meghan-markle',
    type: 'spouse',
    position: { x: 1200, y: 400 },
    data: {
      id: 'meghan-markle',
      name: 'Meghan Markle',
      label: 'Duchess of Sussex (b. 1981)',
      position: { x: 1200, y: 400 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Meghan%2C_Duchess_of_Sussex_%28cropped%29.jpg/220px-Meghan%2C_Duchess_of_Sussex_%28cropped%29.jpg',
      parentId: 'prince-harry',
    },
  },
  {
    id: 'prince-archie',
    type: 'child',
    position: { x: 1050, y: 600 },
    data: {
      id: 'prince-archie',
      name: 'Prince Archie',
      label: 'Prince Archie (b. 2019)',
      position: { x: 1050, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Archie_Mountbatten-Windsor_%28cropped%29.jpg/220px-Archie_Mountbatten-Windsor_%28cropped%29.jpg',
      parentId: 'prince-harry',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'princess-lilibet',
    type: 'child',
    position: { x: 1200, y: 600 },
    data: {
      id: 'princess-lilibet',
      name: 'Princess Lilibet',
      label: 'Princess Lilibet (b. 2021)',
      position: { x: 1200, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lilibet_Mountbatten-Windsor_%28cropped%29.jpg/220px-Lilibet_Mountbatten-Windsor_%28cropped%29.jpg',
      parentId: 'prince-harry',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
];

export const britishRoyalFamilyEdges: Edge[] = [
  {
    id: 'edge-queen-philip',
    source: 'queen-elizabeth-ii',
    target: 'prince-philip',
    type: 'straight',
  },
  {
    id: 'edge-queen-charles',
    source: 'queen-elizabeth-ii',
    target: 'king-charles-iii',
    type: 'step',
  },
  {
    id: 'edge-charles-diana',
    source: 'king-charles-iii',
    target: 'princess-diana',
    type: 'straight',
  },
  {
    id: 'edge-charles-camilla',
    source: 'king-charles-iii',
    target: 'camilla',
    type: 'straight',
  },
  {
    id: 'edge-charles-william',
    source: 'king-charles-iii',
    target: 'prince-william',
    type: 'step',
  },
  {
    id: 'edge-william-kate',
    source: 'prince-william',
    target: 'kate-middleton',
    type: 'straight',
  },
  {
    id: 'edge-william-george',
    source: 'prince-william',
    target: 'prince-george',
    type: 'step',
  },
  {
    id: 'edge-william-charlotte',
    source: 'prince-william',
    target: 'princess-charlotte',
    type: 'step',
  },
  {
    id: 'edge-william-louis',
    source: 'prince-william',
    target: 'prince-louis',
    type: 'step',
  },
  {
    id: 'edge-charles-harry',
    source: 'king-charles-iii',
    target: 'prince-harry',
    type: 'step',
  },
  {
    id: 'edge-harry-meghan',
    source: 'prince-harry',
    target: 'meghan-markle',
    type: 'straight',
  },
  {
    id: 'edge-harry-archie',
    source: 'prince-harry',
    target: 'prince-archie',
    type: 'step',
  },
  {
    id: 'edge-harry-lilibet',
    source: 'prince-harry',
    target: 'princess-lilibet',
    type: 'step',
  },
];
