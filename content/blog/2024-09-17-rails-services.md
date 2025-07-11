---
title: 'Rails Services: Encapsulating Business Logic'
date: '2024-09-17'
excerpt: 'Learn how to implement the Service Object pattern in Ruby on Rails to encapsulate business logic, improve code organization, and enhance testability. Includes practical examples and testing strategies.'
readTime: '7 min read'
tags:
  [
    'Ruby on Rails',
    'Design Patterns',
    'Software Architecture',
    'Testing',
    'Best Practices',
  ]
author: 'Geovanny Cordero Valverde'
---

In Ruby on Rails, services are a way to encapsulate business logic that doesn't fit into models,
controllers, or helpers. They're a great way to keep your codebase clean and organized, making it easier to maintain and
test. They should be responsible for performing only a specific task or operation, for example, sending an email, or
fetching data from an external API.

### Usage

Let's try to understand the usage of services in Rails with an example. Suppose you have a blog application where you
need to get a specific blog post by its ID.

This is an example of a simple service class in Rails:

```ruby

module Blogs
  class GetById < ApplicationService
    def initialize(id:)
      @id = id
    end

    def call
      Blog.find(@id)
    end
  end
end
```

In this example, the `Blogs::GetById` service class is responsible for fetching a blog post by its ID. The `call` method
is where the business logic is implemented.

See the `ApplicationService` class, which is a base class that all service classes inherit from. This class allows us to
call the service in the following way inside the controller:

```ruby
blog = Blogs::GetById.call(id: params[:id])
```

The `ApplicationService` class looks like this:

```ruby
class ApplicationService
  def self.call(*arguments, **keyword_arguments, &block)
    new(*arguments, **keyword_arguments, &block).call
  end
end
```

As you see, this class allows us to call the service class in a more readable way. We can pass the arguments to the
service class as keyword arguments.

Something important to recall is that the `call` method can be modified to use any service you want and the controller
will remain the same.

### Testing

Service objects are easy to test because they encapsulate logic in a single class. This makes them perfect candidates
for unit testing.

Here is an example of how you can test the `Blogs::GetById` service class:

```ruby
RSpec.describe Blogs::GetById, type: :service do
  let(:id) { 669 }
  let(:blog) { instance_double(Blog) }

  it 'returns the category with the specified ID' do
    allow(Blog).to receive(:find).with(id).and_return(category)
    expect(Blogs::GetById.call(id:)).to eq(blog)
  end

  it 'raises an error when no category is found' do
    allow(Blog).to receive(:find).with(id).and_raise(ActiveRecord::RecordNotFound)
    expect { Blogs::GetById.call(id:) }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
```

This test verifies both the happy path (where the blog is found) and the failure case (where no blog is found).

### Conclusion

Services are a powerful pattern in Ruby on Rails for managing business logic that doesn't belong in controllers or models. By using services, you keep your codebase cleaner and easier to maintain, and you’ll find that writing tests becomes more straightforward.
