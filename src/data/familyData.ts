import { Edge } from '@xyflow/react';
import { FamilyNode } from '../types/family';

export const royalFamilyNodes: FamilyNode[] = [
  {
    id: 'node-1',
    type: 'parent',
    position: { x: 0, y: 0 },
    data: {
      id: 'node-1',
      name: 'Prithvi Narayan Shah',
      label: 'Prithvi Narayan Shah',
      position: { x: 0, y: 0 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Prithvi_Narayan_Shah.png',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-2',
    type: 'spouse',
    position: { x: 300, y: 0 },
    data: {
      id: 'node-2',
      name: 'Queen Narendra Rajya Lakshmi Devi',
      label: 'Narendra Rajya Lakshmi Devi',
      position: { x: 300, y: 0 },
      imageUrl: '', // No public image found
      parentId: 'node-1',
    },
  },
  {
    id: 'node-3',
    type: 'child',
    position: { x: 150, y: 200 },
    data: {
      id: 'node-3',
      name: 'Pratap Singh Shah',
      label: 'Pratap Singh Shah',
      position: { x: 150, y: 200 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pratap_Singh_Shah.jpg',
      parentId: 'node-1',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-4',
    type: 'spouse',
    position: { x: 450, y: 200 },
    data: {
      id: 'node-4',
      name: 'Queen Rajendra Lakshmi Devi',
      label: 'Rajendra Lakshmi Devi',
      position: { x: 450, y: 200 },
      imageUrl: '', // No public image found
      parentId: 'node-3',
    },
  },
  {
    id: 'node-5',
    type: 'child',
    position: { x: 300, y: 400 },
    data: {
      id: 'node-5',
      name: 'Rana Bahadur Shah',
      label: 'Rana Bahadur Shah',
      position: { x: 300, y: 400 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Rana_Bahadur_Shah.jpg',
      parentId: 'node-3',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-6',
    type: 'spouse',
    position: { x: 600, y: 400 },
    data: {
      id: 'node-6',
      name: 'Kantavati Jha',
      label: 'Kantavati Jha',
      position: { x: 600, y: 400 },
      imageUrl: '', // No public image found
      parentId: 'node-5',
    },
  },
  {
    id: 'node-7',
    type: 'spouse',
    position: { x: 750, y: 400 },
    data: {
      id: 'node-7',
      name: 'Queen Tripurasundari',
      label: 'Tripurasundari',
      position: { x: 750, y: 400 },
      imageUrl: '', // No public image found
      parentId: 'node-5',
    },
  },
  {
    id: 'node-8',
    type: 'child',
    position: { x: 450, y: 600 },
    data: {
      id: 'node-8',
      name: 'Girvan Yuddha Bikram Shah',
      label: 'Girvan Yuddha Bikram Shah',
      position: { x: 450, y: 600 },
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/8/8b/King_Girvan_Yuddhavikram_Shah_%281797-1816%29_LACMA_M.76.129.jpg',
      parentId: 'node-5',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-9',
    type: 'spouse',
    position: { x: 750, y: 600 },
    data: {
      id: 'node-9',
      name: 'Queen Siddhi Rajya Lakshmi Devi',
      label: 'Siddhi Rajya Lakshmi Devi',
      position: { x: 750, y: 600 },
      imageUrl: '', // No public image found
      parentId: 'node-8',
    },
  },
  {
    id: 'node-10',
    type: 'child',
    position: { x: 600, y: 800 },
    data: {
      id: 'node-10',
      name: 'Rajendra Bikram Shah',
      label: 'Rajendra Bikram Shah',
      position: { x: 600, y: 800 },
      imageUrl: '', // No public image found
      parentId: 'node-8',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-11',
    type: 'spouse',
    position: { x: 900, y: 800 },
    data: {
      id: 'node-11',
      name: 'Queen Samrajya Lakshmi Devi',
      label: 'Samrajya Lakshmi Devi',
      position: { x: 900, y: 800 },
      imageUrl: '', // No public image found
      parentId: 'node-10',
    },
  },
  {
    id: 'node-12',
    type: 'child',
    position: { x: 750, y: 1000 },
    data: {
      id: 'node-12',
      name: 'Surendra Bikram Shah',
      label: 'Surendra Bikram Shah',
      position: { x: 750, y: 1000 },
      imageUrl: '', // No public image found
      parentId: 'node-10',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-13',
    type: 'spouse',
    position: { x: 1050, y: 1000 },
    data: {
      id: 'node-13',
      name: 'Queen Trailokya Rajya Lakshmi Devi',
      label: 'Trailokya Rajya Lakshmi Devi',
      position: { x: 1050, y: 1000 },
      imageUrl: '', // No public image found
      parentId: 'node-12',
    },
  },
  {
    id: 'node-14',
    type: 'child',
    position: { x: 900, y: 1200 },
    data: {
      id: 'node-14',
      name: 'Trailokya Bikram Shah',
      label: 'Trailokya Bikram Shah',
      position: { x: 900, y: 1200 },
      imageUrl: '', // No public image found
      parentId: 'node-12',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-15',
    type: 'child',
    position: { x: 1050, y: 1400 },
    data: {
      id: 'node-15',
      name: 'Prithvi Bir Bikram Shah',
      label: 'Prithvi Bir Bikram Shah',
      position: { x: 1050, y: 1400 },
      imageUrl: '', // No public image found
      parentId: 'node-14',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-16',
    type: 'spouse',
    position: { x: 1350, y: 1400 },
    data: {
      id: 'node-16',
      name: 'Queen Laxmi Divyeshwari Devi',
      label: 'Laxmi Divyeshwari Devi',
      position: { x: 1350, y: 1400 },
      imageUrl: '', // No public image found
      parentId: 'node-15',
    },
  },
  {
    id: 'node-17',
    type: 'child',
    position: { x: 1200, y: 1600 },
    data: {
      id: 'node-17',
      name: 'Tribhuvan Bir Bikram Shah',
      label: 'Tribhuvan Bir Bikram Shah',
      position: { x: 1200, y: 1600 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/King_Tribhuvan.jpg',
      parentId: 'node-15',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-18',
    type: 'spouse',
    position: { x: 1500, y: 1600 },
    data: {
      id: 'node-18',
      name: 'Queen Kanti Rajya Lakshmi Devi',
      label: 'Kanti Rajya Lakshmi Devi',
      position: { x: 1500, y: 1600 },
      imageUrl: '', // No public image found
      parentId: 'node-17',
    },
  },
  {
    id: 'node-19',
    type: 'child',
    position: { x: 1350, y: 1800 },
    data: {
      id: 'node-19',
      name: 'Mahendra Bir Bikram Shah',
      label: 'Mahendra Bir Bikram Shah',
      position: { x: 1350, y: 1800 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/King_Mahendra.jpg',
      parentId: 'node-17',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-20',
    type: 'spouse',
    position: { x: 1650, y: 1800 },
    data: {
      id: 'node-20',
      name: 'Queen Indra Rajya Lakshmi Devi',
      label: 'Indra Rajya Lakshmi Devi',
      position: { x: 1650, y: 1800 },
      imageUrl: '', // No public image found
      parentId: 'node-19',
    },
  },
  {
    id: 'node-21',
    type: 'child',
    position: { x: 1500, y: 2000 },
    data: {
      id: 'node-21',
      name: 'Birendra Bir Bikram Shah',
      label: 'Birendra Bir Bikram Shah',
      position: { x: 1500, y: 2000 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/King_Birendra.jpg',
      parentId: 'node-19',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-22',
    type: 'spouse',
    position: { x: 1800, y: 2000 },
    data: {
      id: 'node-22',
      name: 'Queen Aishwarya Rajya Lakshmi Devi',
      label: 'Aishwarya Rajya Lakshmi Devi',
      position: { x: 1800, y: 2000 },
      imageUrl: '', // No public image found
      parentId: 'node-21',
    },
  },
  {
    id: 'node-23',
    type: 'child',
    position: { x: 1650, y: 2200 },
    data: {
      id: 'node-23',
      name: 'Dipendra Bir Bikram Shah',
      label: 'Dipendra Bir Bikram Shah',
      position: { x: 1650, y: 2200 },
      imageUrl: '', // No public image found
      parentId: 'node-21',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-24',
    type: 'child',
    position: { x: 1800, y: 2200 },
    data: {
      id: 'node-24',
      name: 'Gyanendra Bir Bikram Shah',
      label: 'Gyanendra Bir Bikram Shah',
      position: { x: 1800, y: 2200 },
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/King_Gyanendra.jpg',
      parentId: 'node-19',
      canAddChildren: true,
      canAddSpouse: true,
    },
  },
  {
    id: 'node-25',
    type: 'spouse',
    position: { x: 2100, y: 2200 },
    data: {
      id: 'node-25',
      name: 'Queen Komal Rajya Lakshmi Devi',
      label: 'Komal Rajya Lakshmi Devi',
      position: { x: 2100, y: 2200 },
      imageUrl: '', // No public image found
      parentId: 'node-24',
    },
  },
];

export const royalFamilyEdges: Edge[] = [
  {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-3',
    type: 'step',
  },
  {
    id: 'edge-2',
    source: 'node-2',
    target: 'node-3',
    type: 'step',
  },
  {
    id: 'edge-3',
    source: 'node-3',
    target: 'node-5',
    type: 'step',
  },
  {
    id: 'edge-4',
    source: 'node-4',
    target: 'node-5',
    type: 'step',
  },
  {
    id: 'edge-5',
    source: 'node-5',
    target: 'node-8',
    type: 'step',
  },
  {
    id: 'edge-6',
    source: 'node-6',
    target: 'node-8',
    type: 'step',
  },
  {
    id: 'edge-7',
    source: 'node-8',
    target: 'node-10',
    type: 'step',
  },
  {
    id: 'edge-8',
    source: 'node-9',
    target: 'node-10',
    type: 'step',
  },
  {
    id: 'edge-9',
    source: 'node-10',
    target: 'node-12',
    type: 'step',
  },
  {
    id: 'edge-10',
    source: 'node-11',
    target: 'node-12',
    type: 'step',
  },
  {
    id: 'edge-11',
    source: 'node-12',
    target: 'node-14',
    type: 'step',
  },
  {
    id: 'edge-12',
    source: 'node-13',
    target: 'node-14',
    type: 'step',
  },
  {
    id: 'edge-13',
    source: 'node-14',
    target: 'node-15',
    type: 'step',
  },
  {
    id: 'edge-14',
    source: 'node-15',
    target: 'node-17',
    type: 'step',
  },
  {
    id: 'edge-15',
    source: 'node-16',
    target: 'node-17',
    type: 'step',
  },
  {
    id: 'edge-16',
    source: 'node-17',
    target: 'node-19',
    type: 'step',
  },
  {
    id: 'edge-17',
    source: 'node-18',
    target: 'node-19',
    type: 'step',
  },
  {
    id: 'edge-18',
    source: 'node-19',
    target: 'node-21',
    type: 'step',
  },
  {
    id: 'edge-19',
    source: 'node-20',
    target: 'node-21',
    type: 'step',
  },
  {
    id: 'edge-20',
    source: 'node-21',
    target: 'node-23',
    type: 'step',
  },
  {
    id: 'edge-21',
    source: 'node-22',
    target: 'node-23',
    type: 'step',
  },
  {
    id: 'edge-22',
    source: 'node-19',
    target: 'node-24',
    type: 'step',
  },
  {
    id: 'edge-23',
    source: 'node-20',
    target: 'node-24',
    type: 'step',
  },
  {
    id: 'edge-24',
    source: 'node-24',
    target: 'node-25',
    type: 'step',
  },
];
