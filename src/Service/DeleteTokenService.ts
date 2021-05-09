interface Request {
    id: string;
};

class DeleteTokenService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('is not possible to delete token');
    }
}

export default DeleteTokenService;