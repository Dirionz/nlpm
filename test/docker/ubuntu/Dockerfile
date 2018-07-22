FROM ubuntu:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

ENV LANG en_US.UTF-8

RUN apt-get install --yes sudo build-essential curl file git python-setuptools ruby git

RUN adduser --disabled-password --gecos '' user
RUN adduser user sudo
RUN echo "root    ALL=(ALL:ALL) ALL %admin ALL=(ALL) NOPASSWD: ALL %sudo   ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers
RUN echo "Defaults env_keep += 'HOME'" >> /etc/sudoers

RUN chown -R user:user /home/user
USER user

# Install Linuxbrew
RUN git clone https://github.com/Linuxbrew/brew.git $HOME/.linuxbrew
ENV PATH="/home/user/.linuxbrew/bin:${PATH}"
RUN brew list # Installs ruby dep without returning exitcode 1
RUN brew update || true
RUN brew doctor || true
#RUN brew install node npm

#ENV NVM_VERSION v0.29.0
ENV NODE_VERSION v8.4.0
# Replace shell with bash so we can source files

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

# Install NODE
RUN source ~/.nvm/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm use --delete-prefix $NODE_VERSION;

ADD . /home/user/nlpm
RUN ls /home/user
RUN ls /home/user/nlpm
RUN ls /home/user/nlpm/test/config

RUN mkdir /home/user/.config
RUN mkdir /home/user/.config/nlpm
RUN cp /home/user/nlpm/test/config/config.yml /home/user/.config/nlpm/
RUN cp /home/user/nlpm/test/config/packages.json /home/user/.config/nlpm/
