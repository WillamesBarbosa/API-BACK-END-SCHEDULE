function verifyCrm(crm) {
  // CRM STANDARD FORMAT -> 123456/PE
  const regex = /^\d{6}\/[A-Z]{2}$/;

  return regex.test(crm);
}

module.exports = { verifyCrm };
