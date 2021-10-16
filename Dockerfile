FROM node

RUN apt-get update && \
   apt-get upgrade -y && \
   apt-get install -y git

RUN git clone https://github.com/Sable/wu-wei-benchmarking-toolkit
RUN cd wu-wei-benchmarking-toolkit && \
npm install && \
npm link

RUN mkdir artifacts