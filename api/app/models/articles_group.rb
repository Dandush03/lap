class ArticlesGroup < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  has_many :articles, class_name: 'Article', foreign_key: 'articles_group_id'

  validates :name, presence: true, uniqueness: { scope: :company_id }
end
