FROM rafaelsoares/archlinux:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN pacman -Syyu --noconfirm

ENV LANG en_US.UTF-8

RUN pacman -Sy --noconfirm sudo file git python-setuptools python-pip lsb-release ruby base-devel
#Trizen dep
RUN pacman -Sy --noconfirm diffutils pacutils perl>=5.20.0 perl-libwww perl-term-ui perl-json perl-data-dump perl-lwp-protocol-https perl-term-readline-gnu

RUN useradd -m -g wheel -s /bin/bash user
RUN echo "root    ALL=(ALL:ALL) ALL %admin ALL=(ALL) NOPASSWD: ALL %wheel   ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers
RUN echo "Defaults env_keep += 'HOME'" >> /etc/sudoers

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

RUN mkdir /home/user/.config || true
RUN mkdir /home/user/.config/nlpm || true
RUN cp /home/user/nlpm/test/config/config.yml /home/user/.config/nlpm/
RUN cp /home/user/nlpm/test/config/packages.json /home/user/.config/nlpm/
