# AI Gateway Checklist

## Fit

- Multiple applications, teams, models, or environments need shared controls.
- Centralized authentication, quotas, routing, logging, or failover would reduce duplication.
- A single prototype is not being over-engineered too early.

## Controls

- Caller authentication and authorization model is defined.
- Rate limits and quotas are mapped to teams, products, or environments.
- Routing rules and fallback behavior are documented.
- Logging captures enough data for usage analysis without exposing sensitive prompt content unnecessarily.

## Operations

- Gateway ownership and support path are named.
- Cost visibility is available by product or consumer.
- Policy changes have a release and rollback process.
