const Quest = require('../models/Quest');

const {
    getAllQuests,
    getQuestById
} = require('../controllers/questController');

// Mock the Quest model
jest.mock('../models/Quest');

describe('Quest Controller Tests', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllQuests', () => {
        
        it('should return a list of quests with status 200', async () => {
            const mockQuests = [{}];
            Quest.find.mockResolvedValue(mockQuests);

            await getAllQuests(mockReq, mockRes);

            expect(Quest.find).toHaveBeenCalledWith({});
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockQuests);
        });

        it('should return a 500 error if fetching quests fails', async () => {
            const mockError = new Error('Failed to fetch quests');
            Quest.find.mockRejectedValue(mockError);

            await getAllQuests(mockReq, mockRes);

            expect(Quest.find).toHaveBeenCalledWith({});
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error fetching quests',
                error: mockError.message,
            });
        });
    });

    describe('getQuestById', () => {

        it('should return a quest by ID with status 200', async () => {
            const mockQuest = { _id: '68e823b2c5b69e7f1e69dc88', name: 'Quest 1' };
            Quest.findById.mockResolvedValue(mockQuest);
            mockReq.params = { id: '68e823b2c5b69e7f1e69dc88' };

            await getQuestById(mockReq, mockRes);

            expect(Quest.findById).toHaveBeenCalledWith('68e823b2c5b69e7f1e69dc88');
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockQuest);
        });

        it('should return a 404 error if quest is not found', async () => {
            Quest.findById.mockResolvedValue(null);
            mockReq.params = { id: '1' };

            await getQuestById(mockReq, mockRes);

            expect(Quest.findById).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Quest not found' });
        });

        it('should return a 500 error if fetching quest fails', async () => {
            const mockError = new Error('Failed to fetch quest');
            Quest.findById.mockRejectedValue(mockError);
            mockReq.params = { id: '1' };

            await getQuestById(mockReq, mockRes);

            expect(Quest.findById).toHaveBeenCalledWith('1');
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error fetching quest',
                error: mockError.message,
            });
        });
    });

});