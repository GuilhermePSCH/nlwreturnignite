import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {} },
  { sendMail: async () => {} }
)

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64;13912313280g'
    })).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64;13912313280g'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'example type',
      comment: '',
      screenshot: 'data:image/png;base64;13912313280g'
    })).rejects.toThrow();
  })

  it('should not be able to submit with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'example type',
      comment: '',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();
  })
});