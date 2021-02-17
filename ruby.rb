require 'socket'
server = TCPServer.new 3003

while session = server.accept
  request = session.gets
  puts request

  session.print "HTTP/1.1 200\r\n"
  session.print "Content-Type: text/plain\r\n"
  session.print "\r\n"
  session.print "hello world"

  session.close
end
