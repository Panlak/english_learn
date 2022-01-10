FROM ruby:2.7.2
RUN apt-get update -qq && apt-get install -y build-essential postgresql-client

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

RUN groupadd -g 1001 english_learn
RUN useradd  -g 1001 -l -m -s /bin/bash -u 1001 english_learn
USER root
ENV APP_HOME /home/english_learn/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY . $APP_HOME

RUN gem install bundler
RUN bundle install
RUN yarn install --ignore-engines
RUN rails assets:precompile

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
