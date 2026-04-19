const express = require('express');
const app = express();
app.use(express.json());

/**
 * CampusOS X - Payment Service (Saga Pattern Implementation)
 * Manages distributed fee payments and academic standing updates.
 */

const KafkaClient = {
  sendEvent: async (topic, payload) => {
    console.log(`[Kafka] Emitting to ${topic}:`, payload.type);
  }
};

app.post('/pay-fees', async (req, { tenant_id, student_id, amount }) => {
  const transactionId = `tx_${Date.now()}`;

  try {
    // --- STEP 1: Payment Initiation ---
    console.log(`💰 Initiating Payment for Student ${student_id} (Amount: ${amount})`);
    
    // --- STEP 2: External Gateway (Stripe/Paypal) ---
    const paymentSuccess = true; // Simulated
    if (!paymentSuccess) throw new Error("Payment Gateway Timeout");

    // --- STEP 3: Update Transactional DB ---
    // db.payments.create({ id: transactionId, status: 'SUCCESS' })

    // --- STEP 4: Emit Saga Event (Triggering downstream updates) ---
    // This event tells the User Service to update enrollment status
    // and the Notification Brain to send a receipt.
    await KafkaClient.sendEvent('campus.payments.saga', {
      transactionId,
      type: 'PAYMENT_COMPLETED',
      student_id,
      amount
    });

    res.json({ status: 'Payment Successful', transactionId });
  } catch (error) {
    // --- COMPENSATING TRANSACTION ---
    console.error(`❌ Payment Failed. Triggering Rollback for ${transactionId}`);
    await KafkaClient.sendEvent('campus.payments.saga', {
      transactionId,
      type: 'PAYMENT_FAILED_ROLLBACK',
      student_id
    });
    res.status(500).json({ error: "Transaction Rollback Triggered" });
  }
});

app.listen(4005, () => console.log('💳 Payment Service (Saga) operational on port 4005'));
