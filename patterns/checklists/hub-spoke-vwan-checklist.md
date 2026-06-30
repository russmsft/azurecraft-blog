# Hub-Spoke vs Virtual WAN Checklist

## Decision Context

- Expected number of regions, spokes, and branches is understood.
- Current network skills and operating model are documented.
- Firewall, inspection, and route control requirements are clear.

## Hub-Spoke Signals

- Custom routing and inspection paths are required.
- Network team can own route tables, firewalls, peering, and troubleshooting.
- Regional footprint is limited or intentionally controlled.

## Virtual WAN Signals

- Global branch and region scale is expected.
- Managed connectivity and standardized onboarding are more valuable than custom topology.
- Routing complexity would become expensive to operate manually.

## Migration

- Coexistence path is documented if moving from one model to the other.
- Connectivity testing covers routing, DNS, security inspection, and failover.
