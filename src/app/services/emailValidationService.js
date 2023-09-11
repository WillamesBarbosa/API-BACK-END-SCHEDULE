class EmailValidation {
  async confirmationEmail(id) {
    const idReal = atob(id);

    return idReal;
  }
}

module.exports = new EmailValidation();
