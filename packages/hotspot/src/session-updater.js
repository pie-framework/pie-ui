export function updateSessionValue(session, model, data) {
  const { question: { multipleCorrect  } } = model;
  session.answers = session.answers || [];

  if (!data.selected) {
    session.answers = session.answers.filter(answer => answer.index !== data.index);
  } else {
    if (multipleCorrect) {
      session.answers.push(data);
    } else {
      session.answers = [data];
    }
  }
}
