import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InvoiceService {
  constructor() {}

  async getInvoices() {
    Logger.log('Invoices to Users');
    return 'Invoices to Users';
  }
}
