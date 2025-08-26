// src/dataset.js

const dataset = {
  "smartphone": {
    carbon: 70,
    water: 2000,
    waste: 50,
    breakdown: {
      manufacturing: 50,
      transport: 10,
      usage: 10
    }
  },
  "laptop": {
    carbon: 200,
    water: 6000,
    waste: 150,
    breakdown: {
      manufacturing: 150,
      transport: 30,
      usage: 20
    }
  },
  "toothpaste": {
    carbon: 1.5,
    water: 10,
    waste: 0.05,
    breakdown: {
      production: 1,
      packaging: 0.3,
      transport: 0.2
    }
  },
  "toothbrush": {
    carbon: 1,
    water: 5,
    waste: 0.02,
    breakdown: {
      production: 0.6,
      packaging: 0.2,
      transport: 0.2
    }
  },
  "soap": {
    carbon: 0.9,
    water: 6,
    waste: 0.03,
    breakdown: {
      production: 0.5,
      packaging: 0.2,
      transport: 0.2
    }
  },
  "shampoo": {
    carbon: 2,
    water: 12,
    waste: 0.06,
    breakdown: {
      production: 1.2,
      packaging: 0.5,
      transport: 0.3
    }
  },
  "milk (1L)": {
    carbon: 3,
    water: 1000,
    waste: 0.2,
    breakdown: {
      farming: 2,
      packaging: 0.5,
      transport: 0.5
    }
  },
  "rice (1kg)": {
    carbon: 4,
    water: 2500,
    waste: 0.3,
    breakdown: {
      farming: 3,
      processing: 0.6,
      transport: 0.4
    }
  },
  "wheat (1kg)": {
    carbon: 2.5,
    water: 1800,
    waste: 0.2,
    breakdown: {
      farming: 1.8,
      processing: 0.4,
      transport: 0.3
    }
  },
  "bread (1 loaf)": {
    carbon: 1.2,
    water: 150,
    waste: 0.05,
    breakdown: {
      farming: 0.5,
      baking: 0.4,
      packaging: 0.3
    }
  },
  "egg (1)": {
    carbon: 0.6,
    water: 200,
    waste: 0.01,
    breakdown: {
      farming: 0.5,
      packaging: 0.05,
      transport: 0.05
    }
  },
  "chicken (1kg)": {
    carbon: 6.9,
    water: 4325,
    waste: 0.5,
    breakdown: {
      farming: 6,
      processing: 0.5,
      transport: 0.4
    }
  },
  "beef (1kg)": {
    carbon: 27,
    water: 15000,
    waste: 1,
    breakdown: {
      farming: 24,
      processing: 2,
      transport: 1
    }
  },
  "tea (1 cup)": {
    carbon: 0.03,
    water: 30,
    waste: 0.005,
    breakdown: {
      farming: 0.02,
      processing: 0.005,
      transport: 0.005
    }
  },
  "coffee (1 cup)": {
    carbon: 0.2,
    water: 130,
    waste: 0.01,
    breakdown: {
      farming: 0.15,
      processing: 0.03,
      transport: 0.02
    }
  },
  "jeans": {
    carbon: 33,
    water: 7600,
    waste: 0.8,
    breakdown: {
      cotton: 25,
      processing: 5,
      transport: 3
    }
  },
  "t-shirt": {
    carbon: 7,
    water: 2500,
    waste: 0.2,
    breakdown: {
      cotton: 5,
      processing: 1,
      transport: 1
    }
  },
  "shoes": {
    carbon: 14,
    water: 4400,
    waste: 0.5,
    breakdown: {
      leather: 9,
      processing: 3,
      transport: 2
    }
  },
  "plastic bottle (1)": {
    carbon: 0.1,
    water: 3,
    waste: 0.02,
    breakdown: {
      production: 0.07,
      transport: 0.02,
      disposal: 0.01
    }
  },
  "paper (1kg)": {
    carbon: 1.3,
    water: 300,
    waste: 0.1,
    breakdown: {
      production: 1,
      transport: 0.2,
      disposal: 0.1
    }
  },
  "notebook": {
    carbon: 2,
    water: 500,
    waste: 0.15,
    breakdown: {
      production: 1.5,
      transport: 0.3,
      disposal: 0.2
    }
  },
  "car (1km)": {
    carbon: 0.2,
    water: 0.05,
    waste: 0.01,
    breakdown: {
      fuel: 0.15,
      manufacturing: 0.03,
      maintenance: 0.02
    }
  },
  "bus (1km per passenger)": {
    carbon: 0.08,
    water: 0.02,
    waste: 0.005,
    breakdown: {
      fuel: 0.06,
      manufacturing: 0.01,
      maintenance: 0.01
    }
  },
  "train (1km per passenger)": {
    carbon: 0.04,
    water: 0.015,
    waste: 0.003,
    breakdown: {
      electricity: 0.03,
      manufacturing: 0.005,
      maintenance: 0.005
    }
  },
  "flight (1km per passenger)": {
    carbon: 0.25,
    water: 0.1,
    waste: 0.02,
    breakdown: {
      fuel: 0.2,
      airportOps: 0.03,
      maintenance: 0.02
    }
  },
  "electricity (1kWh)": {
    carbon: 0.7,
    water: 2,
    waste: 0.05,
    breakdown: {
      coal: 0.5,
      gas: 0.1,
      renewables: 0.1
    }
  },
  "plastic bag": {
    carbon: 0.1,
    water: 2,
    waste: 0.02,
    breakdown: {
      production: 0.07,
      transport: 0.02,
      disposal: 0.01
    }
  }
};

export default dataset;
