# Private Endpoints and DNS Checklist

## Ownership

- Private endpoint creation and approval owner is named.
- Private DNS zone owner is named.
- Zone-link process is documented for every spoke and environment.

## Resolution Path

- Azure-to-Azure name resolution is tested.
- On-premises-to-Azure forwarding path is documented.
- Branch and VPN client resolution paths are understood.
- Runbook distinguishes DNS, routing, and service configuration failures.

## Operations

- Endpoint lifecycle is included in workload deployment and teardown.
- Naming conventions are consistent.
- Support team can inspect endpoint state, private IP, DNS record, and VNet links.
