# Public GenAIOps Q&A Bank

## What is GenAIOps?

GenAIOps is the operating discipline for generative AI applications. It helps teams build, evaluate, deploy, monitor, govern, and optimise GenAI systems in a repeatable way.

## How is it different from MLOps?

MLOps often focuses on custom model training and retraining. GenAIOps focuses more on prompts, agents, retrieval, orchestration, evaluation, safety, monitoring, and cost around foundation models.

## Why is evaluation important?

LLM outputs are probabilistic. Evaluation provides repeatable quality gates for groundedness, relevance, coherence, safety, and task success before changes reach users.

## What is groundedness?

Groundedness measures whether the answer is supported by the provided sources. It is especially important for retrieval-augmented generation and enterprise knowledge assistants.

## Why use an AI gateway?

A gateway can centralise authentication, policy enforcement, routing, rate limits, quotas, logging, failover, and usage analytics.

## How do we reduce hallucination?

Use approved knowledge sources, retrieval, citations, evaluation, prompt constraints, monitoring, feedback, and human review for high-risk cases.

## What should we monitor?

Monitor operational signals like latency, errors, throughput, and token use. Also monitor AI-specific signals like safety events, feedback, groundedness, failed retrievals, and quality trends.

## How should cost be managed?

Track token usage, route simple tasks to smaller models, reduce unnecessary context, cache repeatable responses, enforce quotas, and measure cost against successful outcomes.

## Do we need agents for everything?

No. Some problems only need search, summarisation, classification, or RAG. Agents are useful when the task requires multi-step reasoning, tool use, or workflow coordination.

## What makes a good first pilot?

A good pilot is bounded, valuable, measurable, supported by trusted data, and safe enough to test with clear access control, evaluation, monitoring, and cost visibility.
