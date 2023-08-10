FROM ruby:3-bookworm
ARG DEBIAN_FRONTEND=noninteractive

ENV GEM_HOME /gems
ENV PATH $GEM_HOME/bin:$PATH

RUN gem install jekyll bundler

VOLUME [ "/app" ]
WORKDIR /app

COPY Gemfile* ./
RUN bundle install
