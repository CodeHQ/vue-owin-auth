# Start from the Cypress base image with Node 16
FROM cypress/base:16

# # Update Ubuntu
# RUN apt-get update
# RUN apt-get -y install apt-utils

# # Install necessary libraries
# RUN apt-get -y install curl wget unzip procps gnupg2 pinentry-curses software-properties-common

# # # Install GitVersion v5.*
# # RUN dotnet tool install --global GitVersion.Tool --version 5.*

# # Cleanup
# RUN apt-get clean

# # Uses "git", "ssh-agent" and "history-substring-search" bundled plugins
# RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
#     -t cloud \
#     -p git -p 'history-substring-search' \
#     -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
#     -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down'