# frozen_string_literal: true

require 'csv'

# Switch Tenant
Apartment::Tenant.switch! :sageemea # switch hub_subdomain to desired subdomain name

# Specify file to write data into
filename = 'sageemea_shipping_info.csv' # rename to the format hub_name_shipping_info.csv

headers = %w[user_id subscribe email]

# Writing to CSV begins
CSV.open(filename, 'w', write_headers: true, headers: headers) do |doc|
  Contact.all.includes(%i[preference]).each do |c|
    subscribe = !c.preference.unsubscribed_from_all_emails
    doc << [c.uuid, subscribe, c.email]
  end
end

# Upload to s3. Generated Link is valid for 24 hours.
AwsS3Uploaders::Temp.new.upload_export_file('temp', File.open(filename, 'r'))
