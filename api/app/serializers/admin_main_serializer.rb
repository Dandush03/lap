# frozen_string_literal: true

# Admin Main Serializer
class AdminMainSerializer
  attr_reader :company

  def initialize(company)
    included_tables = %i[articles_groups articles taxes]
    company = Company.includes(included_tables).find(company.id)
    @company = company
  end

  def self.process(company, _scope = {})
    new(company).serialize
  end

  def serialize
    {
      company: company_serializer,
      articles_groups: company.articles_groups,
      articles: articles_serializer,
      accounts: accounts_serializer,
      exchanges: exchange_serializer,
      taxes: company.taxes
    }
  end

  private

  def exchange_serializer
    {
      exchanges_list: ExchangeSerializer.serialize(company.exchanges.order(created_at: :desc).limit(10)),
      row_counter: Exchange.count
    }
    
  end

  def articles_serializer
    ArticleSerializer.serialize(company.articles)
  end

  def accounts_serializer
    AccountingAccountsSerializer.serialize(company)
  end

  def company_serializer
    CompanySerializer.new(company)
  end
end
