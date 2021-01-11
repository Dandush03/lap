# rubocop: disable Metrics/BlockLength
require 'rails_helper'

RSpec.describe AuthorizeApiRequest, type: :request do
  # Create test user
  let(:company) { create(:company)}
  let(:user) { create(:user, company_id: company.id) }
  # Mock `Authorization` header
  let(:header) { token_generator(user.id, '127.0.0.1') }
  # Invalid request subject
  subject(:invalid_request_obj) { described_class.new({}, '') }
  # Valid request subject
  subject(:request_obj) { described_class.new(header, '127.0.0.1') }

  # Test Suite for AuthorizeApiRequest#call
  # This is our entry point into the service class
  describe '#call' do
    # returns user object when request is valid
    context 'when valid request' do
      it 'returns user object' do
        result = request_obj.call
        expect(result[:user]).to eq(user)
      end
    end

    # returns error message when invalid request
    context 'when invalid request' do
      context 'when missing token' do
        it 'raises a MissingToken error' do
          expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::MissingToken, 'Missing token')
        end
      end

      context 'when invalid token by user_id' do
        subject(:invalid_request_obj) do
          # custom helper method `token_generator`
          described_class.new(invalid_token_generator(5, '12'))
        end

        it 'raises an InvalidToken error' do
          expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
        end
      end

      context 'when invalid token by request_ip' do
        subject(:invalid_request_obj) do
          # custom helper method `token_generator`
          described_class.new(token_generator(user.id, '1'))
        end

        it 'raises an InvalidToken error' do
          expect { invalid_request_obj.call }
            .to raise_error(ExceptionHandler::InvalidIp, /Invalid token/)
        end
      end

      context 'when invalid token by old token' do
        # custom helper method `token_generator`
        let(:header_new) { token_generator(user.id, '127.0.0.1') }
        let(:header) { token_generator(user.id, '127.0.0.123') }
        subject(:request_obj) { described_class.new(header, '127.0.0.123') }
        subject(:request_obj_new) { described_class.new(header_new, '127.0.0.1') }

        it 'raises an InvalidToken error' do
          request_obj.call
          request_obj_new.call
          expect { request_obj.call }
            .to raise_error(ExceptionHandler::InvalidTokenAge, /Invalid token/)
        end
      end

      context 'when token is expired' do
        let(:header) { expired_token_generator(user.id, '1') }
        subject(:request_obj) { described_class.new(header) }

        it 'raises ExceptionHandler::ExpiredSignature error' do
          expect { request_obj.call }
            .to raise_error(
              ExceptionHandler::InvalidToken,
              /Signature has expired/
            )
        end
      end

      context 'fake token' do
        let(:header) { 'foobar' }
        subject(:invalid_request_obj) { described_class.new(header) }

        it 'handles JWT::DecodeError' do
          expect { invalid_request_obj.call }
            .to raise_error(
              ExceptionHandler::InvalidToken,
              /Not enough or too many segments/
            )
        end
      end
    end
  end
end
# rubocop: enable Metrics/BlockLength