
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Learn React',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'Code React',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },    
    {
      description: 'Deploy React',
      status: 'finished',
      createdAt: Date.now() - 100000,
    }
  ]
}