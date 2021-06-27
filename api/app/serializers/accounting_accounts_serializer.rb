# frozen_string_literal: true

# Acounting Accounts Serializer
class AccountingAccountsSerializer
  attr_reader :accounts

  def initialize(company)
    selecte_columns = %i[id name subcategory category]
    accounts = company.accounting_accounts
    @accounts = accounts.select(selecte_columns)
  end

  def self.serialize(company, _scope = {})
    new(company).process
  end

  def process
    {
      buy: accounts.select { |a| a.category == 'out' },
      sell: accounts.select { |a| a.category == 'in' },
      inv: accounts.select { |a| a.category == 'inv' }
    }
  end

  private

  def company_serializer
    CompanySerializer.new(company)
  end
end
