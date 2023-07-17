export const html = ({ url, text }) => {
  return `
  <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: capitalize; color: teal;">Welcome to RB's Coding.</h2>
        <p>Congratulations! You are almost set to start using NextAuthv4. Just click the button below to validate your email address.</p>
        <a href=${url} style="background-color: crimson;text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
        <p>if the button doesn't work for any reason, you can also click on the link below:</p>
        <div>${url}</div>
    </div>
  `;
};
