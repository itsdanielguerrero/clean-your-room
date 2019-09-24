function calculateVolLife (product, coverageLevels, price){
  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage

    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }

  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }

  return parseInt(price * 100) / 100
}

function calculateLTD (product, employee, price){
  var salaryPercentage = product.coveragePercentage / 100

      price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price

      if (product.employerContribution.mode === 'dollar') {
        price = price - product.employerContribution.contribution
      } else {
        dollarsOff = price * product.employerContribution.contribution
        price = price - dollarsOff
      }

      return parseInt(price * 100) / 100

}

module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0
  var dollarsOff = 0

  switch (product.type) {
    case 'volLife':
      return calculateVolLife(product, coverageLevels, price)
    case 'ltd':
      return calculateLTD(product, employee, price)
    default:
      return 0
  }
}