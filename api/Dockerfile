FROM ruby:3.0.1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

RUN gem install bundler

WORKDIR /api

ARG RAILS_ENV

COPY Gemfile* ./

RUN bundle install
COPY . .


COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000


CMD ["rails", "server", "-b", "0.0.0.0"]
