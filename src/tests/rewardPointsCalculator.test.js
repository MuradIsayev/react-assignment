import { calculateRewardPoints } from '../utils/rewardPointsCalculator';

describe('Reward Points Calculator', () => {
    it('should calculate reward points correctly for amounts greater than 100', () => {
        const reward = calculateRewardPoints(120);
        expect(reward).toBe(90);
    });

    it('should calculate reward points correctly for amounts between 50 and 100', () => {
        const reward = calculateRewardPoints(75);
        expect(reward).toBe(25);
    });

    it('should calculate reward points correctly for amounts less than or equal to 50', () => {
        const reward = calculateRewardPoints(30);
        expect(reward).toBe(0);
    });
});
