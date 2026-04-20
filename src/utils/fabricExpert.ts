import { FabricProperty } from '../types/project';

/**
 * Expert system for fabric-aware recommendations.
 * Provides tool settings based on material properties.
 */
export class FabricExpert {
  private static recommendationEngine: Record<string, Partial<FabricProperty>> = {
    'Silk': {
      recommendedNeedle: '70/10 Microtex',
      recommendedFoot: 'Straight Stitch Foot',
      recommendedThread: 'Fine Silk Thread',
      weight: 'Light'
    },
    'Denim': {
      recommendedNeedle: '100/16 Denim',
      recommendedFoot: 'Heavy Duty Foot',
      recommendedThread: 'Jeans Thread (Cotton-Wrapped Polyester)',
      weight: 'Heavy'
    },
    'Linen': {
      recommendedNeedle: '80/12 Universal',
      recommendedFoot: 'All-Purpose Foot',
      recommendedThread: 'Cotton Thread',
      weight: 'Medium'
    },
    'Jersey': {
      recommendedNeedle: '80/12 Ballpoint',
      recommendedFoot: 'Walking Foot',
      recommendedThread: 'Polyester Thread',
      weight: 'Medium',
      stretch: 0.5
    }
  };

  /**
   * Retrieves tool recommendations for a given fabric type.
   */
  static getRecommendations(fabricType: string): Partial<FabricProperty> {
    return this.recommendationEngine[fabricType] || {
      recommendedNeedle: '80/12 Universal',
      recommendedFoot: 'All-Purpose Foot',
      recommendedThread: 'All-Purpose Polyester'
    };
  }
}
