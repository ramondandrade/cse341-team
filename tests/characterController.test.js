const Character = require('../models/Character');

const {
  getAllCharacters,
  getCharacterById,
  getCharactersByUserId
} = require('../controllers/characterController');

// Mock the Character model
jest.mock('../models/Character');

describe('Character Controller Tests', () => {
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

  describe('getAllCharacters', () => {
      
    it('should return a list of characters with status 200', async () => {
      const mockCharacters = [{}];
      Character.find.mockResolvedValue(mockCharacters);

      await getAllCharacters(mockReq, mockRes);

      expect(Character.find).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCharacters);
    });

    it('should return a 500 error if fetching characters fails', async () => {
      const mockError = new Error('Failed to fetch characters');
      Character.find.mockRejectedValue(mockError);

      await getAllCharacters(mockReq, mockRes);

      expect(Character.find).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error fetching characters',
        error: mockError.message,
      });
    });
  });

  describe('getCharacterById', () => {

    it('should return a character by ID with status 200', async () => {
      const mockCharacter = {  };
      Character.findById.mockResolvedValue(mockCharacter);
      mockReq.params = { id: '68dee99d805d9a12d14d304f' };

      await getCharacterById(mockReq, mockRes);

      expect(Character.findById).toHaveBeenCalledWith('68dee99d805d9a12d14d304f');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCharacter);
    });

    it('should return a 404 error if character is not found', async () => {
      Character.findById.mockResolvedValue(null);
      mockReq.params = { id: '1' };

      await getCharacterById(mockReq, mockRes);

      expect(Character.findById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Character not found' });
    });

    it('should return a 400 error if character ID is invalid', async () => {
      const mockError = new Error('Invalid ObjectId');
      Character.findById.mockRejectedValue(mockError);
      mockReq.params = { id: 'invalid-id' };

      await getCharacterById(mockReq, mockRes);

      expect(Character.findById).toHaveBeenCalledWith('invalid-id');
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid character ID format' });
    });

    it('should return a 500 error if fetching character fails', async () => {
      const mockError = new Error('Failed to fetch character');
      Character.findById.mockRejectedValue(mockError);
      mockReq.params = { id: '1' };

      await getCharacterById(mockReq, mockRes);

      expect(Character.findById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error fetching character',
        error: mockError.message,
      });
    });
  });

  describe('getCharactersByUserId', () => {
    it('should return characters by user ID with status 200', async () => {
      const mockCharacters = [{ name: 'Character 1', userId: 'user1' }, { name: 'Character 2', userId: 'user1' }];
      Character.find.mockResolvedValue(mockCharacters);
      mockReq.params = { userId: 'user1' };

      await getCharactersByUserId(mockReq, mockRes);

      expect(Character.find).toHaveBeenCalledWith({ userId: 'user1' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCharacters);
    });

    it('should return a 404 error if no characters are found for the user', async () => {
      Character.find.mockResolvedValue([]);
      mockReq.params = { userId: 'user1' };

      await getCharactersByUserId(mockReq, mockRes);

      expect(Character.find).toHaveBeenCalledWith({ userId: 'user1' });
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No characters found for this user' });
    });

    it('should return a 500 error if fetching characters by user ID fails', async () => {
      const mockError = new Error('Failed to fetch characters by user ID');
      Character.find.mockRejectedValue(mockError);
      mockReq.params = { userId: 'user1' };

      await getCharactersByUserId(mockReq, mockRes);

      expect(Character.find).toHaveBeenCalledWith({ userId: 'user1' });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error fetching characters by user ID',
        error: mockError.message,
      });
    });
  });

});