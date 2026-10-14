---
term: "DNS Record"
definition: "A DNS record is an entry in a Domain Name System database that translates human-readable domain names into machine-readable IP addresses."
date: "2026-10-14T08:22:51.647Z"
slug: "dns-record"
keywords: "DNS, domain name, IP address, record, internet, network, hosting, domain name system"
---

Think of DNS records as the address book for the internet. When you type a website address, like `example.com`, into your browser, your computer doesn't know where that website is located on the internet. It needs to find the corresponding IP address (a series of numbers, like `192.0.2.1`). DNS records are the specific pieces of information that store these mappings.

There are various types of DNS records, each serving a different purpose. For instance, an "A" record directly links a domain name to an IPv4 address, while an "AAAA" record links it to an IPv6 address. Other records can store information about mail servers (MX records) or provide aliases for domain names (CNAME records). When your computer queries the DNS system, it retrieves the relevant record to obtain the necessary IP address to connect to the desired server.

An example of a DNS record might look like this: `example.com. IN A 192.0.2.1`, indicating that the domain `example.com` resolves to the IP address `192.0.2.1`.

This term is commonly used in the context of internet infrastructure, website hosting, network administration, and cybersecurity.