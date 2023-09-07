async function verifyCrm(crm) {
  // CRM STANDARD FORMAT -> 123456/PE
  const regex = /(\d{6})(\/[A-Z]{2})/;

  const match = crm.match(regex);

  if (match) {
    return true;
  }

  return false;
}

module.exports = { verifyCrm };
