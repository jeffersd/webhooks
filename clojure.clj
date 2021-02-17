(ns clojure-server
  (:require [org.httpkit.server :refer [run-server]]))

(defn app [req]
  {:status 200
   :headers {"Content-Type" "text/plain"}
   :body "hello world"})

(defn -main [& args]
  (run-server app {:port 3002})
  (println "Server started on port 3002"))
