# studious-tribble
Javascript Biweekly California State Tax Witholding Calulator

This is a simple function to calculate exact california witholding tax. Please use it for whatever you like. The default values are from California DE44 2022 "METHOD B - EXACT CALCULATION METHOD" starting on page 40. Update the values as needed if calculating a different tax year.


call the function like this:

calc_pit_tax(gross, status, allowances, add_allowances)

Definition of Attributes
gross = Gross pay (int)
status = Marital status (string) <--look at the code for the options
allowances = Number of allowances for standard deduction (int)
add_allowances = Number of Additional Withholding Allowances for Estimated Deductions (int)
