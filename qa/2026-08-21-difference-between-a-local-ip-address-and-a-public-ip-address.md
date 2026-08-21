---
question: "Difference between a local IP address and a public IP address?"
answer: "A local IP address is used within a private network, such as a home or office, and is not directly accessible from the internet. A public IP address is assigned by an Internet Service Provider (ISP) and is visible to the entire internet, allowing devices to communicate globally."
date: "2026-08-21T03:11:56.935Z"
slug: "difference-between-a-local-ip-address-and-a-public-ip-address"
keywords: "IP address, local IP, public IP, private IP, network, router, ISP, NAT, internet"
---

### Local IP Address

A local IP address, also known as a private IP address, is assigned to devices within a private network. These addresses are managed by a router, which acts as a gateway to the internet for all devices on the local network. Local IP addresses are not unique on the internet; the same local IP address can be used by multiple devices in different private networks. This is possible because these addresses are not routable over the public internet.

**Example:** In a typical home network, your computer, smartphone, and smart TV might each have a local IP address like `192.168.1.10`, `192.168.1.11`, and `192.168.1.12` respectively. These are only meaningful within your home's network.

### Public IP Address

A public IP address is assigned to your router by your Internet Service Provider (ISP). This address is globally unique and is what allows your network to communicate with other devices and servers on the internet. When your devices access the internet, your router uses Network Address Translation (NAT) to translate their local IP addresses into its single public IP address for outgoing requests, and then translates incoming responses back to the correct local device.

**Example:** Your ISP might assign your home router a public IP address such as `203.0.113.45`. This is the address that websites and online services see when you or your devices connect to them.

### Key Differences and How They Work Together

The primary difference lies in their scope and visibility. Local IP addresses are for internal communication within a private network, while public IP addresses are for external communication on the global internet. Your router acts as the intermediary, using NAT to allow multiple devices with local IP addresses to share a single public IP address for internet access. This conserves the limited pool of public IPv4 addresses and provides a layer of security by hiding the internal network structure.

### Limitations and Edge Cases

*   **Dynamic vs. Static Public IPs:** Most home users receive a dynamic public IP address from their ISP, which can change periodically. Businesses might opt for a static public IP address, which remains constant, for specific services.
*   **IPv6:** The advent of IPv6 has vastly increased the available IP addresses, potentially reducing the reliance on NAT for address conservation. However, IPv4 still remains prevalent, making NAT and the distinction between local and public IPs crucial.
*   **Multiple Public IPs:** In some complex network setups, an organization might have multiple public IP addresses for various purposes.