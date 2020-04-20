import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionsDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Tipo de transação invalida.');
    }

    if (type === 'outcome' && total < value) {
      throw new Error('Valor para retirada é maior do que o total.');
    }

    const transactionReturn = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transactionReturn;
  }
}

export default CreateTransactionService;
