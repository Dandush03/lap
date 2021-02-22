def user
  has_many :carts, class_name: "Cart", foreign_key: "user_id"
  username
  paswd
end

def Item
  has_one_attached img
  validates_acceptance_of %i[name ref_price]
end

def iventory
  item_id

  open
  cureent_inv

  def update_current_inv
  end
end

def cart
  belongs_to :user, class_name: "User", foreign_key: "user_id"
  item_id
  qty
  price
  name

  status

  temp_order_id
end

# Controller

def index_of_article
  Article.all
  @companies.articles.all.include(img)
end

def index_of_cart
  items = cart.find(temp_order_id).select(:id)
  @Article.find([items])
end

<link_to  "asdkaj", cart_path(id), class: wahd>


<form action= '' method='post'>
<input type="hidden" method='_method' value= 'post'>
<input type="hidden" method='athenticyti_token' value= 'askjugdaskjydgf uhqavsu183'>
<% @article.each do |article| %>
  <%= f.field_number >
  <%= subtmit %>
<% end>

resources :articles, only [:index]
resources :cart, only %i[index create delete]
