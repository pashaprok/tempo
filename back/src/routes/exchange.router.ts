import { Router } from 'express';
import {
  currentCurrencyExchange,
  deleteCurrencyExchange,
  getAllCurrencyExchanges,
  postCurrencyExchange,
} from '../controllers/currencyExchange.controller';

const router: Router = Router();

router
  .route('/')
  .get(getAllCurrencyExchanges)
  .post(postCurrencyExchange)
  .delete(deleteCurrencyExchange);

router.route('/current').post(currentCurrencyExchange);

export default router;
