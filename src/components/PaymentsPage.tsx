import React from "react";
import { Container } from './components';
import { PaymentPageController } from "../pages/PaymentPage/PaymentPage.controller";

export const PaymentsPage = () => {
  return (
    <Container>
      <PaymentPageController/>
    </Container>
  )
};
